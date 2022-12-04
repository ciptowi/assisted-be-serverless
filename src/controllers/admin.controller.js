const db = require('../db')
const response = require('../utils/response')
const auth = require('../middlewares/auth.middleware')
const jwt = require('jsonwebtoken')
const secret = require('../utils/secret')

/*
#status (0 = inactive, 1 = active)
*/
const findAll = 'SELECT * FROM admin ORDER BY id ASC'
const findById = 'SELECT * FROM admin WHERE id = $1'
const findByUsername = 'SELECT * FROM admin WHERE username = $1'
const insert = 'INSERT INTO admin (username, password, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)'
const upadateUserPass = 'UPDATE admin SET username = $1, password = $2, updated_at = $3 WHERE id = $4'
const upadateStatus = 'UPDATE admin SET status = $1, updated_at = $2 WHERE id = $3'

exports.get = (req, res) => {
  db.query(findAll, (error, results) => {
    if (error) {
      response.error500(res, error.message)
    }
    response.success(res, results.rows)
  })
}

exports.register = (req, res) => {
  const { username, password } = req.body
  const passwordHash = auth.hashPassword(password)
  const status = 1
  const date = new Date()

  db.query(findByUsername, [username], (error, results) => {
    if (error) {
      response.error500(res, error.message)
    } else {
      if (results.rowCount === 0) {
        db.query(insert, [username, passwordHash, status, date, date], (error, results) => {
          if (error) {
            response.error500(res, error.message)
          } else {
            response.created(res)
          }})
      } else {
        response.authFailed(res, 'Username alredy existing')
      }
    }
  })
}

exports.login = (req, res) => {
  const { username, password } = req.body

  db.query(findByUsername, [username], (error, results) => {
    if (error) {
      response.error500(res, error.message)
    } else {
      if(results.rowCount === 0) {
        response.authFailed(res, 'Failed! Username Not found')
      } else if (!auth.checkPassword(password, results.rows[0].password)) {
        response.authFailed(res, 'Failed! Wrong Password')
      } else if (results.rows[0].status === 0) {
        response.authFailed(res, 'Failed! Account was Disabled')
      } else {
        const payload = { id: results.rows[0].id, username: results.rows[0].username }
        const user = { id: results.rows[0].id, username: results.rows[0].username, token: auth.generateToken(payload) }
        response.build(res, 200, true, 'Logged in successfully', user, null)
      }
    }
  })
}

exports.update = (req, res) => {
  const { username, new_password, old_password } = req.body
  const date = new Date()
  const newPassword = auth.hashPassword(new_password)
  const token = req.headers.authorization
  const userId = jwt.verify(token, secret.key, (err, decoded) => {
    if (err) {
      return err.message
    }
    return decoded.id
  })

  db.query(findById, [userId], (error, results) => {
    if (error) {
      response.error500(res, error.message)
    } else {
      if (!auth.checkPassword(old_password, results.rows[0].password)) {
        response.authFailed(res, 'Failed! Wrong Password')
      } else {
        db.query(upadateUserPass, [username, newPassword, date, userId], (error, results) => {
          if (error) {
            response.error500(res, error.message)
          } else {
            response.build(res, 201, true, `Account was updated successfully`, null, null)
          }
        })
      }
    }
  })
}

exports.delete = (req, res) => {
  const { password } = req.body
  const date = new Date()
  const status = 0
  const token = req.headers.authorization
  const userId = jwt.verify(token, secret.key, (err, decoded) => {
    if (err) {
      return err.message
    }
    return decoded.id
  })

  db.query(findById, [userId], (error, results) => {
    if (error) {
      response.error500(res, error.message)
    } else {
      if (!auth.checkPassword(password, results.rows[0].password)) {
        response.authFailed(res, 'Failed! Wrong Password')
      } else {
        db.query(upadateStatus, [status, date, userId], (error, results) => {
          if (error) {
            response.error500(res, error.message)
          } else {
            response.build(res, 201, true, `Account was deleted successfully`, null, null)
          }
        })
      }
    }
  })
}