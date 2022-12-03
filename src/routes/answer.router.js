const controller = require('../controllers/answer.controller');
const middleware = require('../middlewares/verification');

module.exports = function (router) {
  router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
    next();
  });
  router.post('/answer/insert', middleware.protected, controller.insert);
  router.get('/answer', controller.get);
  router.get('/answer/:id', controller.getById);
  router.put('/answer/:id', middleware.protected, controller.update);
  router.delete('/answer/:id', middleware.protected, controller.delete);
}