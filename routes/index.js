var express = require('express');
var router = express.Router();
var config = require('../config/config.json');

/* GET home page. */
router.get('/', function(req, res, next) {  
  res.render(
    config.view || 'index', 
    { 
      title: 'DIRECTO', 
      config: config
    }
  );
});

module.exports = router;
