const router = require("express").Router();

require('./admin.router')(router)
require('./category.router')(router)
require('./participant.router')(router)
require('./question.router')(router)
require('./answer.router')(router)
require('./participant.router')(router)
require('./result.router')(router)

module.exports = router;