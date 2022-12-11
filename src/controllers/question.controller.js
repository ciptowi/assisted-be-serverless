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
const findByStatus = 'SELECT * FROM question WHERE status = $1 ORDER BY id ASC'
const findByCategory = 'SELECT * FROM question WHERE category_id = $1 AND status = $2 ORDER BY id ASC'
const insert = 'INSERT INTO question (id, content, status, category_id) VALUES ($1, $2, $3, $4)'
const upadate = 'UPDATE question SET content = $1, category_id = $2 WHERE id = $3'
const upadateStatus = 'UPDATE question SET status = $1 WHERE id = $2'

exports.insert = (req, res) => {
  const { id, content, category_id } = req.body
  const status = 1
 
  db.query(insert, [id, content, status, category_id], (error, results) => {
    if (error) {
      response.error500(res, error.message)
    } else {
      response.created(res)
    }
  })
}

exports.get = (req, res) => {
  const { status } = req.query
  const { category_id } = req.query

  if (status != 0 && category_id != 0) {
    db.query(findByCategory, [category_id, status], (error, results) => {
      if (error) {
        response.error500(res, error.message)
      }
      response.success(res, results.rows)
    })
  }else if (status != 0 && category_id == 0) {
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

  db.query(upadate, [content, category_id, id], (error, results) => {
    if (error) {
      response.error500(res, error.message)
    } else {
      response.build(res, 201, true, `Question was updated successfully`, null, null)
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
    response.build(res, 201, true, `Question was deleted successfully`, null, null)
  })
}
