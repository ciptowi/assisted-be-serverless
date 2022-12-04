const db = require('../db')
const response = require('../utils/response')

/*
#status (0 = inactive, 1 = active)
*/
const findAll = 'SELECT * FROM test_session ORDER BY id ASC'
const findById = 'SELECT * FROM test_session WHERE id = $1'
const findByPartisipantId = 'SELECT * FROM test_session WHERE partisipant_id = $1'
const findByStatus = 'SELECT * FROM test_session WHERE status = $1'
const insert = 'INSERT INTO test_session (partisipant_id, answer_id, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)'
const upadateStatus = 'UPDATE test_session SET status = $1, updated_at = $2 WHERE id = $3'

exports.insert = (req, res) => {
  const { partisipant_id, answer_id } = req.body
  const status = 1
  const date = new Date()

  db.query(insert, [partisipant_id, answer_id, status, date, date], (error, results) => {
    if (error) {
      response.error500(res, error.message)
    } else {
      response.created(res)
    }
  })
}

exports.get = (req, res) => {
  const { participant_id, status } = req.query

  if (participant_id !== undefined) {
    db.query(findByPartisipantId, [participant_id], (error, results) => {
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