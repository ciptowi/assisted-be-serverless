const { category } = require('../db/models');
const response = require('../utils/response');

/*
#status (0 = inactive, 1 = active)
*/

exports.insert = (req, res) => {
  const payload = { name: req.body.name, status: 1 }
  category.create(payload).then(() => {
    response.created(res)
    }).catch((error) => {
      response.error500(res, error.message)
    })
};
exports.get = (req, res) => {
  const status = req.query.status
  const name = req.query.name
  if (name !== undefined) {
    category.findAll({ where: { name: name } }).then((data) => {
      response.success(res, data)
      }).catch((error) => {
        response.error500(res, error.message)
      })
  } else if (status !== undefined) {
    category.findAll({ where: { status: status } }).then((data) => {
      response.success(res, data)
      }).catch((error) => {
        response.error500(res, error.message)
      })
  } else {
    category.findAll().then((data) => {
      response.success(res, data)
      }).catch((error) => {
        response.error500(res, error.message)
      })
  }
};

exports.getById = (req, res) => {
  const categoryId = req.params.id
    category.findOne({ where: { id: categoryId } }).then((data) => {
      response.success(res, data)
      }).catch((error) => {
        response.error500(res, error.message)
      })
};

exports.update = (req, res) => {
  const categoryId = req.params.id
  const payload = {
    name: req.body.name,
    status: req.body.status
  }
  if (payload.status === undefined || payload.status === '') {
    category.update({ name: req.body.name, status: 1 }, { where: { id: categoryId } }).then(() => {
      response.build(res, 201, true, `Successfully`, null, null)
    }).catch((err) => {
      response.error500(res, err.message)
    })
  } else if (payload.name === undefined || payload.name === '') {
    category.update({ status: parseInt(req.body.status) }, { where: { id: categoryId } }).then(() => {
      response.build(res, 201, true, `Successfully`, null, null)
    }).catch((err) => {
      response.error500(res, err.message)
    })
  } else {
    category.update(payload, { where: { id: categoryId } }).then(() => {
      response.build(res, 201, true, `Successfully`, null, null)
    }).catch((err) => {
      response.error500(res, err.message)
    })
  }
};
