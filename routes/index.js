var debug = require('debug')('test:router');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  debug("/ get performed");
  res.render('index', { title: 'Express' });
});

module.exports = router;
