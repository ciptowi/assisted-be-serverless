const controller = require('../controllers/category.controller');
const middleware = require('../middlewares/verification');

module.exports = function (router) {
  router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
    next();
  });
  router.post('/category/insert', middleware.protected, controller.insert);
  router.get('/category', controller.get);
  router.get('/category/:id', controller.getById);
  router.put('/category/:id', middleware.protected, controller.update);
};