const { Admin } = require('../db/models');
const response = require('../utils/response');
const auth = require('../middlewares/auth.middleware');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');

/*
#status (0 = inactive, 1 = active)
*/

exports.register = (req, res) => {
  const payload = {
    username: req.body.username,
    password: auth.hashPassword(req.body.password),
    status: 1
  }
  if (payload.username === null || payload.username === '') {
    response.authFailed(res, 'Username cannot be empty')
  } else if (payload.password === null || payload.password === '') {
    response.authFailed(res, 'Password cannot be empty')
  } else {
    Admin.findOne({ where: { username: req.body.username } }).then((data) => {
      if (data) {
        response.authFailed(res, 'Username alredy existing')
      } else {
        Admin.create(payload).then(() => {
          response.created(res)
        }).catch((error) => {
          response.error500(res, error.message)
        })
      }
    })
  }
};

exports.login = (req, res) => {
  if (req.body.username === null || req.body.username === '') {
    response.authFailed(res, 'Username cannot be empty')
  } else if (req.body.password === null || req.body.password === '') {
    response.authFailed(res, 'Password cannot be empty')
  } else {
    Admin.findOne({ where: { username: req.body.username } }).then((data) => {
      if(!data) {
        response.authFailed(res, 'Failed! Username Not found')
      } else if(!auth.checkPassword(req.body.password, data.password)) {
        response.authFailed(res, 'Failed! Wrong Password')
      } else {
        const payload = {
          id: data.id,
          username: data.username,
          role: data.role
        }
        const user = {
          id: data.id,
          username: data.username,
          token: auth.generateToken(payload)
        }
        response.build(res, 200, true, 'Logged in successfully', user, null)
      }
    }).catch((error) => {
      response.error500(res, error.message)
    })
  }
};

exports.update = (req, res) => {
  const username = req.body.username
  const password = req.body.new_password
  const status = req.body.status
  const oldPassword = req.body.old_password
  const token = req.headers.authorization
  const userId = jwt.verify(token, secret.key, (err, decoded) => {
    if (err) {
      return err.message
    }
    return decoded.id
  })
  Admin.findOne({ where: { id: userId } }).then((data) => {
    if(!auth.checkPassword(oldPassword, data.password)) {
      response.authFailed(res, 'Failed! Wrong Password')
    } else {
      if (status === undefined || status === '') {
        Admin.update({ 
          username: username,
          password: auth.hashPassword(password),
          status: 1 
        }, { 
          where: { id: userId } }).then(() => {
          response.build(res, 201, true, `Account was updated successfully`, null, null)
        }).catch((err) => {
          response.error500(res, err.message)
        })
      } else if (username === undefined || username === '' || password === undefined || password === '') {
        Admin.update({ 
          status: parseInt(status)
        }, { 
          where: { id: userId } }).then(() => {
          response.build(res, 201, true, `Account was deleted successfully`, null, null)
        }).catch((err) => {
          response.error500(res, err.message)
        })
      } else {
        Admin.update({ 
          username: username,
          password: auth.hashPassword(password),
          status: parseInt(status)
        }, { 
          where: { id: userId } }).then(() => {
          response.build(res, 201, true, `Account was updated successfully`, null, null)
        }).catch((err) => {
          response.error500(res, err.message)
        })
      }
    }
  })
};
