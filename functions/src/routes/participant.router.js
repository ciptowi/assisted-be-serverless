const controller = require('../controllers/partisipant.controller');
const middleware = require('../middlewares/verification');

module.exports = function (router) {
  router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
    next();
  });
  router.post('/participant/insert', controller.insert);
  router.get('/participant', controller.get);
  router.get('/participant/:id', controller.getById);
  router.put('/participant/:id', middleware.protected, controller.update);
  router.delete('/participant/:id', middleware.protected, controller.delete);
};