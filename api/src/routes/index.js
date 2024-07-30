var express = require('express')
var router = express.Router()

router.get('/', function (_, res, next) {
  return res.status(200).send('Hello')
})

module.exports = router
