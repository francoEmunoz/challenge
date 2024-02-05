var express = require('express');
var router = express.Router();
const usersRouter = require('./users');

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.use('/users', usersRouter)

module.exports = router;

