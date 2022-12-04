const db = require('../db')
const response = require('../utils/response')

/*
#status (0 = inactive, 1 = active)
*/
const findAll = 'SELECT * FROM category ORDER BY id ASC'
const findById = 'SELECT * FROM category WHERE id = $1'
const findByName = 'SELECT * FROM category WHERE name = $1'
const findByStatus = 'SELECT * FROM category WHERE status = $1'
const insert = 'INSERT INTO category (name, status, created_at, updated_at) VALUES ($1, $2, $3, $4)'
const upadate = 'UPDATE category SET name = $1, status = $2, updated_at = $3 WHERE id = $4'
const upadateStatus = 'UPDATE category SET status = $1, updated_at = $2 WHERE id = $3'

exports.getAll = (req, res) => {
  const { status, name } = req.query

  if (name !== undefined) {
    db.query(findByName, [name], (error, results) => {
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

exports.insert = (req, res) => {
  const { name, status } = req.body
  const date = new Date()

  db.query(findByName, [name], (error, results) => {
    if (error) {
      response.error500(res, error.message)
    } else {
      if (results.rowCount === 0) {
        db.query(insert, [name, status, date, date], (error, results) => {
          if (error) {
            response.error500(res, error.message)
          } else {
            response.created(res)
          }})
      } else {
        response.authFailed(res, 'Category alredy existing')
      }
    }
  })
}

exports.update = (req, res) => {
  const id = req.params.id
  const { name, status } = req.body
  const date = new Date()

  db.query(upadate, [name, status, date, id], (error, results) => {
    if (error) {
      response.error500(res, error.message)
    } else {
      response.build(res, 201, true, `Category was updated successfully`, null, null)
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
    response.build(res, 201, true, `Category was deleted successfully`, null, null)
  })
}