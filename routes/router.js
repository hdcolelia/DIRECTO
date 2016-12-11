var express = require('express');
var router = express.Router();
var config = require('../config/config.json');

/* POST home page. */
router.post('/DIRECTO/process', function(req, res, next) {  
  console.log(req.url);  
  next();
});

module.exports = router;
