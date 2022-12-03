const { test_session } = require('../db/models');
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
    description: req.body.description,
    category_id: req.body.category_id,
    time_limit: req.body.time_limit
  }
  test_session.create(payload).then(() => {
    response.created(res)
    }).catch((error) => {
      response.error500(res, error.message)
    })
};
exports.get = (req, res) => {
  const status = req.query.status
if (status === undefined || status === '') {
  test_session.findAll().then((data) => {
      response.success(res, data)
      }).catch((error) => {
        response.error500(res, error.message)
      })
} else {
  test_session.findAll({ where: { status: status } }).then((data) => {
    response.success(res, data)
    }).catch((error) => {
      response.error500(res, error.message)
    })
  }
};

exports.getById = (req, res) => {
  const test_sessionId = req.params.id
    test_session.findOne({ where: { id: test_sessionId } }).then((data) => {
      response.success(res, data)
      }).catch((error) => {
        response.error500(res, error.message)
      })
};

exports.update = (req, res) => {
  const test_sessionId = req.params.id
  const payload = {
    content: req.body.content, 
    category_id: req.body.category_id
  }
  test_session.update(payload, { where: { id: test_sessionId } }).then(() => {
    response.build(res, 201, true, `Successfully`, null, null)
  }).catch((err) => {
    response.error500(res, err.message)
  })
};

exports.delete = (req, res) => {
  const test_sessionId = req.params.id
  test_session.update({ status: 0 }, { where: { id: test_sessionId } }).then(() => {
    response.build(res, 201, true, `Status Deleted`, null, null)
  }).catch((err) => {
    response.error500(res, err.message)
  })
};
