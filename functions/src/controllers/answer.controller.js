const { answer } = require('../db/models');
const response = require('../utils/response');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');

/*
#status (0 = inactive, 1 = active)
*/

exports.insert = (req, res) => {
  const token = req.headers.authorization
  const userId = jwt.verify(token, secret.key, (err, decoded) => {
    if (err) {
      return err.message
    }
    return decoded.id
  })
  const payload = { 
    content: req.body.content, 
    status: 1 ,
    admin_id: userId || req.body.admin_id,
    category_id: req.body.category_id,
    question_id: req.body.question_id,
    score: req.body.score
  }
  answer.create(payload).then(() => {
    response.created(res)
    }).catch((error) => {
      response.error500(res, error.message)
    })
};
exports.get = (req, res) => {
  const status = req.query.status
  const question_id = req.query.question_id
if (status === undefined || status === '' && question_id === undefined || question_id === '') {
  answer.findAll().then((data) => {
      response.success(res, data)
      }).catch((error) => {
        response.error500(res, error.message)
      })
} else {
  answer.findAll({ where: { status: status, question_id: question_id } }).then((data) => {
    response.success(res, data)
    }).catch((error) => {
      response.error500(res, error.message)
    })
  }
};

exports.getById = (req, res) => {
  const answerId = req.params.id
    answer.findOne({ where: { id: answerId } }).then((data) => {
      response.success(res, data)
      }).catch((error) => {
        response.error500(res, error.message)
      })
};

exports.update = (req, res) => {
  const answerId = req.params.id
  const payload = {
    admin_id: req.body.admin_id,
    question_id: req.body.question_id,
    content: req.body.content,
    score: req.body.score
  }
  answer.update(payload, { where: { id: answerId } }).then(() => {
    response.build(res, 201, true, `Successfully`, null, null)
  }).catch((err) => {
    response.error500(res, err.message)
  })
};

exports.delete = (req, res) => {
  const answerId = req.params.id
  answer.update({ status: 0 }, { where: { id: answerId } }).then(() => {
    response.build(res, 201, true, `Status Deleted`, null, null)
  }).catch((err) => {
    response.error500(res, err.message)
  })
};
