const { question } = require('../db/models');
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
    category_id: req.body.category_id
  }
  question.create(payload).then(() => {
    response.created(res)
    }).catch((error) => {
      response.error500(res, error.message)
    })
};
exports.get = (req, res) => {
  const status = req.query.status
if (status === undefined || status === '') {
  question.findAll().then((data) => {
      response.success(res, data)
      }).catch((error) => {
        response.error500(res, error.message)
      })
} else {
  question.findAll({ where: { status: status } }).then((data) => {
    response.success(res, data)
    }).catch((error) => {
      response.error500(res, error.message)
    })
  }
};

exports.getById = (req, res) => {
  const questionId = req.params.id
    question.findOne({ where: { id: questionId } }).then((data) => {
      response.success(res, data)
      }).catch((error) => {
        response.error500(res, error.message)
      })
};

exports.update = (req, res) => {
  const questionId = req.params.id
  const payload = {
    content: req.body.content, 
    category_id: req.body.category_id
  }
  question.update(payload, { where: { id: questionId } }).then(() => {
    response.build(res, 201, true, `Successfully`, null, null)
  }).catch((err) => {
    response.error500(res, err.message)
  })
};

exports.delete = (req, res) => {
  const questionId = req.params.id
  question.update({ status: 0 }, { where: { id: questionId } }).then(() => {
    response.build(res, 201, true, `Status Deleted`, null, null)
  }).catch((err) => {
    response.error500(res, err.message)
  })
};
