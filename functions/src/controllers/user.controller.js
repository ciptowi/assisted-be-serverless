const { User } = require('../db/models');
const bcrypt = require('bcryptjs');
const response = require('../utils/response');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');

const ROLE = ['ADMIN', 'SUPER ADMIN', 'USER'];
const hashPassword = (password) => bcrypt.hashSync(password, 10)
const checkPassword = (password, existPass) => bcrypt.compareSync(password, existPass);
const generateToken = (payload) => jwt.sign(payload, secret.key);


exports.test = (req, res) => {
  response.build(res, 200, true, 'hello world', null, null)
};

exports.signup = (req, res) => {
  const payload = {
    username: req.body.username,
    password: hashPassword(req.body.password),
    role: req.body.role, 
    status: parseInt(req.body.status)
  }
  User.findOne({ where: { username: req.body.username } })
    .then((data) => {
      if(!ROLE.includes(req.body.role)) {
        response.build(res, 400, false, 'Role not available', null, null)
      } else if (data) {
        response.build(res, 403, false, null, 'username alredy existing', null)
      } else {
        User.create(payload).then(() => {
          response.build(res, 201, true, `Created ${req.body.role} successfuly`, null, null)
        }).catch((error) => {
          response.build(res, 500, false, `Create ${req.body.role} failed`, null, error.message)
        })
      }
    })
};

exports.signin = (req, res) => {
  User.findOne({ where: { username: req.body.username } })
    .then((data) => {
      if(!data) {
        response.build(res, 404, false, null, 'username not found', null)
      } else if(!checkPassword(req.body.password, data.password)) {
        response.build(res, 403, false, null, 'Wrong password !!', null)
      } else {
        const payload = {
          id: data.id,
          username: data.username,
          role: data.role
        }
        const user = {
          id: data.id,
          username: data.username,
          token: generateToken(payload)
        }
        response.build(res, 200, true, null, user, null)

      }
    }).catch((error) => {
      response.build(res, 500, false, `Failed`, null, error.message)
    })
  
};