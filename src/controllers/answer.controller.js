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
const findByCategoryId = 'SELECT answer.*, question.category_id FROM answer JOIN question ON answer.question_id = question.id WHERE question.category_id = $1 AND status = $2 ORDER BY id ASC'
const insert = 'INSERT INTO answer (id, content, status, score, question_id) VALUES ($1, $2, $3, $4, $5)'
const upadate = 'UPDATE answer SET content = $1, score = $2, question_id = $3 WHERE id = $4'
const upadateStatus = 'UPDATE answer SET status = $1 WHERE id = $2'

exports.insert = (req, res) => {
  const { id, content, question_id, score } = req.body
  const status = 1

  db.query(insert, [id, content, status, score, question_id], (error, results) => {
    if (error) {
      response.error500(res, error.message)
    } else {
      response.created(res)
    }
  })
}

exports.get = (req, res) => {
  const {status,question_id,category_id} = req.query

  if (question_id != 0 && status != 0 && category_id == 0) {
    db.query(findByQuestionId, [question_id, status], (error, results) => {
      if (error) {
        response.error500(res, error.message)
      }
      response.success(res, results.rows)
    })
  } else if (question_id == 0 && status != 0 && category_id != 0) {
    db.query(findByCategoryId, [category_id, status], (error, results) => {
      if (error) {
        response.error500(res, error.message)
      }
      response.success(res, results.rows)
    })
  } else if (status != 0 && question_id == 0 && category_id == 0) {
    db.query(findByStatus, [status], (error, results) => {
      if (error) {
        response.error500(res, error.message)
      }
      response.success(res, results.rows)
    })
  } else if (status == 0 && question_id == 0){
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

  db.query(upadate, [content, score, question_id, id], (error, results) => {
    if (error) {
      response.error500(res, error.message)
    } else {
      response.build(res, 201, true, `Answer was updated successfully`, null, null)
    }
  })
}

exports.delete = (req, res) => {
  const id = req.params.id
  const status = 0

  db.query(upadateStatus, [status, id], (error, results) => {
    if (error) {
      response.error500(res, error.message)
    }
    response.build(res, 201, true, `Answer was deleted successfully`, null, null)
  })
}
