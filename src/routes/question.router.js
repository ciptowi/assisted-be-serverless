const controller = require('../controllers/question.controller');
const middleware = require('../middlewares/verification');

module.exports = function (router) {
  router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
    next();
  });
  router.post('/question/insert', middleware.protected, controller.insert);
  router.get('/question', controller.get);
  router.get('/question/:id', controller.getById);
  router.put('/question/:id', middleware.protected, controller.update);
  router.delete('/question/:id', middleware.protected, controller.delete);
}