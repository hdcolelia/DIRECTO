var baseModule = require('../base/baseModule');

class mainModule extends baseModule {
    processRequest(req, res){
        console.log('req.url' + req.url);
        res.render('index', { title: 'Express' });
    }
}

module.exports = new mainModule();