const Pool = require('pg').Pool
const config = require('./config')

const db = new Pool(config)

module.exports = db