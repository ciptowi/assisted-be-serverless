const controller = require('../controllers/admin.controller');
const middleware = require('../middlewares/verification');

module.exports = function (router) {
  router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
    next();
  });
  router.post('/admin/register', controller.register);
  router.post('/admin/login', controller.login);
  router.put('/admin/update', middleware.protected, controller.update);
};