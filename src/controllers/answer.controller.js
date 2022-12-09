const db = require('../db')
const response = require('../utils/response')
const jwt = require('jsonwebtoken')
const secret = require('../utils/secret')

/*
#status (0 = inactive, 1 = active)
*/
const findAll = 'SELECT * FROM answer ORDER BY id ASC'
const findById = 'SELECT * FROM answer WHERE id = $1 ORDER BY id ASC'
const findByStatus = 'SELECT * FROM answer WHERE status = $1 ORDER BY id ASC'
const findByQuestionId = 'SELECT * FROM answer WHERE question_id = $1 AND status = $2 ORDER BY id ASC'
const insert = 'INSERT INTO answer (content, status, score, question_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)'
const upadate = 'UPDATE answer SET content = $1, score = $2, question_id = $3, updated_at = $4 WHERE id = $5'
const upadateStatus = 'UPDATE answer SET status = $1, updated_at = $2 WHERE id = $3'

exports.insert = (req, res) => {
  const date = new Date()
  const { content, question_id, score } = req.body
  const status = 1

  db.query(insert, [content, status, score, question_id, date, date], (error, results) => {
    if (error) {
      response.error500(res, error.message)
    } else {
      response.created(res)
    }
  })
}

exports.get = (req, res) => {
  const {status,question_id} = req.query

  if (question_id !== undefined || question_id !== '' && status !== undefined || status !== '') {
    db.query(findByQuestionId, [question_id, status], (error, results) => {
      if (error) {
        response.error500(res, error.message)
      }
      response.success(res, results.rows)
    })
  } else if (status !== undefined || status !== '' && uestion_id == undefined || question_id == '') {
    db.query(findByStatus, [status], (error, results) => {
      if (error) {
        response.error500(res, error.message)
      }
      response.success(res, results.rows)
    })
  } else {
    db.query(findAll, (error, results) => {
      if (error) {
        response.error500(res, error.message)
      }
      response.success(res, results.rows)
    })
  }
}

exports.getById = (req, res) => {
  const id = req.params.id
  db.query(findById, [id], (error, results) => {
    if (error) {
      response.error500(res, error.message)
    }
    response.success(res, results.rows)
  })
}

exports.update = (req, res) => {
  const id = req.params.id
  const { content, score, question_id } = req.body
  const date = new Date()

  db.query(upadate, [content, score, question_id, date, id], (error, results) => {
    if (error) {
      response.error500(res, error.message)
    } else {
      response.build(res, 201, true, `Answer was updated successfully`, null, null)
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
    response.build(res, 201, true, `Answer was deleted successfully`, null, null)
  })
}
