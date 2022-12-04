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
      } else {
        const payload = { id: results.rows[0].id, username: results.rows[0].username }
        const user = { id: results.rows[0].id, username: results.rows[0].username, token: auth.generateToken(payload) }
        response.build(res, 200, true, 'Logged in successfully', user, null)
      }
    }
  })
};

// exports.update = (req, res) => {
//   const username = req.body.username
//   const password = req.body.new_password
//   const status = req.body.status
//   const oldPassword = req.body.old_password
//   const token = req.headers.authorization
//   const userId = jwt.verify(token, secret.key, (err, decoded) => {
//     if (err) {
//       return err.message
//     }
//     return decoded.id
//   })
//   Admin.findOne({ where: { id: userId } }).then((data) => {
//     if(!auth.checkPassword(oldPassword, data.password)) {
//       response.authFailed(res, 'Failed! Wrong Password')
//     } else {
//       if (status === undefined || status === '') {
//         Admin.update({ 
//           username: username,
//           password: auth.hashPassword(password),
//           status: 1 
//         }, { 
//           where: { id: userId } }).then(() => {
//           response.build(res, 201, true, `Account was updated successfully`, null, null)
//         }).catch((err) => {
//           response.error500(res, err.message)
//         })
//       } else if (username === undefined || username === '' || password === undefined || password === '') {
//         Admin.update({ 
//           status: parseInt(status)
//         }, { 
//           where: { id: userId } }).then(() => {
//           response.build(res, 201, true, `Account was deleted successfully`, null, null)
//         }).catch((err) => {
//           response.error500(res, err.message)
//         })
//       } else {
//         Admin.update({ 
//           username: username,
//           password: auth.hashPassword(password),
//           status: parseInt(status)
//         }, { 
//           where: { id: userId } }).then(() => {
//           response.build(res, 201, true, `Account was updated successfully`, null, null)
//         }).catch((err) => {
//           response.error500(res, err.message)
//         })
//       }
//     }
//   })
// };
