const controller = require('../controllers/session.controller');
const middleware = require('../middlewares/verification');

module.exports = function (router) {
  router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
    next();
  });
  router.post('/test-session/insert', middleware.protected, controller.insert);
  router.get('/test-session', controller.get);
  router.get('/test-session/:id', controller.getById);
  router.put('/test-session/:id', middleware.protected, controller.update);
  router.delete('/test-session/:id', middleware.protected, controller.delete);
}