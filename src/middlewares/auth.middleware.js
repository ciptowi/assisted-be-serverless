const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
const bcrypt = require('bcryptjs');


exports.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10)
};
exports.checkPassword = (password, existPass) => {
  return bcrypt.compareSync(password, existPass);
};
exports.generateToken = (payload) => {
  return jwt.sign(payload, secret.key);
};