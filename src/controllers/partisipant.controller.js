const db = require('../db')
const response = require('../utils/response')

/*
#status (0 = inactive, 1 = active)
*/
const findAll = 'SELECT * FROM partisipant ORDER BY id ASC'
const findById = 'SELECT * FROM partisipant WHERE id = $1'
const findByNik = 'SELECT * FROM partisipant WHERE nik = $1'
const findByStatus = 'SELECT * FROM partisipant WHERE status = $1'
const insert = 'INSERT INTO partisipant (category_id, test_session_id, nik, name, partisipant_numb, score, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)'
const upadate = 'UPDATE partisipant SET category_id = $1, nik = $2, name = $3, partisipant_numb = $4, score = $5, status = $6, updated_at = $7 WHERE id = $8'
const upadateStatus = 'UPDATE partisipant SET status = $1, updated_at = $2 WHERE id = $3'

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
  const { nik } = req.query

  if (nik != undefined && nik != '') {
    db.query(findByNik, [nik], (error, results) => {
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
  const { category_id, nik, name, partisipant_numb, score, status } = req.body
  const date = new Date()

  db.query(upadate, [category_id, nik, name, partisipant_numb, score, status, date, id], (error, results) => {
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
