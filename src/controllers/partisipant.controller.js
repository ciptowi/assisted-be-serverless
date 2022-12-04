const db = require('../db')
const response = require('../utils/response')

/*
#status (0 = inactive, 1 = active)
*/
const findAll = 'SELECT * FROM test_session ORDER BY id ASC'
const findById = 'SELECT * FROM test_session WHERE id = $1'
const findByCategoryId = 'SELECT * FROM test_session WHERE category_id = $1'
const findByStatus = 'SELECT * FROM test_session WHERE status = $1'
const insert = 'INSERT INTO test_session (category_id, test_session_id, nik, name, partisipant_numb, score, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)'
const upadate = 'UPDATE test_session SET category_id = $1, nik = $2, name = $3, partisipant_numb = $4, score = $5, updated_at = $6 WHERE id = $7'
const upadateStatus = 'UPDATE test_session SET status = $1, updated_at = $2 WHERE id = $3'

exports.insert = (req, res) => {
  const { category_id, test_session_id, nik, name, partisipant_numb, score } = req.body
  const status = 1
  const date = new Date()

  db.query(insert, [category_id, test_session_id, nik, name, partisipant_numb, score, status, date, date], (error, results) => {
    if (error) {
      response.error500(res, error.message)
    } else {
      response.created(res)
    }
  })
}

exports.get = (req, res) => {
  const { category_id, status } = req.query

  if (category_id !== undefined) {
    db.query(findByCategoryId, [category_id], (error, results) => {
      if (error) {
        response.error500(res, error.message)
      }
      response.success(res, results.rows)
    })
  } else if (status !== undefined) {
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
  const { category_id, nik, name, partisipant_numb, score } = req.body
  const date = new Date()

  db.query(upadate, [category_id, nik, name, partisipant_numb, score, date, id], (error, results) => {
    if (error) {
      response.error500(res, error.message)
    } else {
      response.build(res, 201, true, `Partisipant was updated successfully`, null, null)
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
    response.build(res, 201, true, `Partisipant was deleted successfully`, null, null)
  })
}
