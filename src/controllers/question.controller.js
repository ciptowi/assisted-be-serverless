const db = require('../db')
const response = require('../utils/response')
const jwt = require('jsonwebtoken')
const secret = require('../utils/secret')

/*
#status (0 = inactive, 1 = active)
*/
const findAll = 'SELECT * FROM question ORDER BY id ASC'
const findAllJoin = 'SELECT question.content, answer.question_id, answer.id, answer.content FROM question, answer WHERE question.id = answer.question_id'
const findById = 'SELECT * FROM question WHERE id = $1'
const findByStatus = 'SELECT * FROM question WHERE status = $1'
const insert = 'INSERT INTO question (content, status, category_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)'
const selectLast = 'SELECT * FROM question WHERE id = SCOPE_IDENTITY()'
const upadate = 'UPDATE question SET content = $1, category_id = $2, updated_at = $3 WHERE id = $4'
const upadateStatus = 'UPDATE question SET status = $1, updated_at = $2 WHERE id = $3'

exports.insert = (req, res) => {
  const date = new Date()
  const { content, category_id } = req.body
  const status = 1
 
  db.query(insert, [content, status, category_id, date, date], (error, results) => {
    if (error) {
      response.error500(res, error.message)
    } else {
      db.query(selectLast, (error, results) => {
        if (error) {
          response.error500(res, error.message)
        }
        response.success(res, results.rows)
      })
    }
  })
}
exports.get = (req, res) => {
  const status = req.query.status
  if (status === undefined || status === '') {
    db.query(findAll, (error, results) => {
      if (error) {
        response.error500(res, error.message)
      }
      response.success(res, results.rows)
    })
  } else {
    db.query(findByStatus, [status], (error, results) => {
      if (error) {
        response.error500(res, error.message)
      }
      response.success(res, results.rows)
    })
  }
};

exports.getById = (req, res) => {
  const id = req.params.id
  db.query(findById, [id], (error, results) => {
    if (error) {
      response.error500(res, error.message)
    }
    response.success(res, results.rows)
  })
};

exports.update = (req, res) => {
  const id = req.params.id
  const { content, category_id } = req.body
  const date = new Date()

  db.query(upadate, [content, category_id, date, id], (error, results) => {
    if (error) {
      response.error500(res, error.message)
    } else {
      response.build(res, 201, true, `Question was updated successfully`, null, null)
    }
  })
}

exports.delete = (req, res) => {
  const id = req.params.id
  const date = new Date()
  const status = 0

  db.query(upadateStatus, [status, date, id], (error, results) => {
    if (error) {
      response.error500(res, error.message)
    }
    response.build(res, 201, true, `Question was deleted successfully`, null, null)
  })
}
