var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // I have to query the db
  data = queryDb();

  htmlOrJson(req,res, data, 'recipes')
});


function htmlOrJson(req, res, data, viewName){
  if(req.accepts('html')){
    res.render(viewName, data)
  }else{
    res.json(data)
  }
}

module.exports = router;
