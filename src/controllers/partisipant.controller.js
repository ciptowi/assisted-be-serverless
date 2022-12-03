const { partisipant } = require('../db/models');
const response = require('../utils/response');

/*
#status (0 = inactive, 1 = active)
*/

exports.insert = (req, res) => {
  const payload = { 
    test_session_id: req.body.test_session_id,
    category_id: req.body.category_id,
    nik: req.body.nik,
    name: req.body.name,
    participant_numb: req.body.participant_numb,
    score: 0 || req.body.status
  }
  partisipant.create(payload).then(() => {
    response.created(res)
    }).catch((error) => {
      response.error500(res, error.message)
    })
};
exports.get = (req, res) => {
  const status = req.query.status
  const test_session_id = req.query.test_session_id
if (status === undefined || status === '' && question_id === undefined || question_id === '') {
  partisipant.findAll().then((data) => {
      response.success(res, data)
      }).catch((error) => {
        response.error500(res, error.message)
      })
} else {
  partisipant.findAll({ where: { 
    test_session_id: test_session_id 
  } }).then((data) => {
    response.success(res, data)
    }).catch((error) => {
      response.error500(res, error.message)
    })
  }
};

exports.getById = (req, res) => {
  const partisipantId = req.params.id
    partisipant.findOne({ where: { id: partisipantId } }).then((data) => {
      response.success(res, data)
      }).catch((error) => {
        response.error500(res, error.message)
      })
};

exports.update = (req, res) => {
  const partisipantId = req.params.id
  const payload = {
    test_session_id: req.body.test_session_id,
    category_id: req.body.category_id,
    nik: req.body.nik,
    name: req.body.name,
    participant_numb: req.body.participant_numb,
    score: req.body.status
  }
  partisipant.update(payload, { where: { id: partisipantId } }).then(() => {
    response.build(res, 201, true, `Successfully`, null, null)
  }).catch((err) => {
    response.error500(res, err.message)
  })
};

exports.delete = (req, res) => {
  const partisipantId = req.params.id
  partisipant.update({ status: 0 }, { where: { id: partisipantId } }).then(() => {
    response.build(res, 201, true, `Status Deleted`, null, null)
  }).catch((err) => {
    response.error500(res, err.message)
  })
};
