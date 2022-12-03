const controller = require('../controllers/result.controller');

module.exports = function (router) {
  router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
    next();
  });
  router.post('/test-result/insert', controller.insert);
  router.get('/test-result', controller.get);
};