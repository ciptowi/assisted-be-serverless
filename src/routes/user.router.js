const controller = require('../controllers/user.controller');

module.exports = function (router) {
  router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
    next();
  });
  router.get('/auth/test', controller.test);
  router.post('/auth/signup', controller.signup);
  router.post('/auth/signin', controller.signin);
};