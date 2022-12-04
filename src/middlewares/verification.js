const jwt = require('jsonwebtoken');
const secret = require('../utils/secret');
const response = require('../utils/response');
// const auth = require('./auth.middleware');

exports.protected = (req, res, next) => {
  let token = req.headers.authorization
  let userId = jwt.verify(token, secret.key, (err, decoded) => {
    if (err) {
      return err.message
    }
    return decoded.id
  })
  if (!token) {
    response.tokenLess(res)
  } else {
    if (userId !== undefined) {
      next();
    } else {
      response.unauthorized(res)
    }
  }
};