const { test_result } = require('../db/models');
const response = require('../utils/response');

/*
#status (0 = inactive, 1 = active)
*/

exports.insert = (req, res) => {
  const payload = { 
    participant_id: req.body.participant_id,
    question_id: req.body.question_id,
    answer_id: req.body.answer_id,
    score: 1
  }
  test_result.create(payload).then(() => {
    response.created(res)
    }).catch((error) => {
      response.error500(res, error.message)
    })
};
exports.get = (req, res) => {
  const status = req.query.status
  const participant_id = req.query.participant_id
if (status === undefined || status === '' && question_id === undefined || question_id === '') {
  test_result.findAll().then((data) => {
      response.success(res, data)
      }).catch((error) => {
        response.error500(res, error.message)
      })
} else {
  test_result.findAll({ where: { 
    participant_id: participant_id 
  } }).then((data) => {
    response.success(res, data)
    }).catch((error) => {
      response.error500(res, error.message)
    })
  }
};