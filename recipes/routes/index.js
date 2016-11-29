// This is just something to start. As soon as we have a more complete website, the routes will be adapted.

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // TODO: Deal with index route.
  res.render('index', { title: 'Express' });

  // data = queryDb();
  // htmlOrJson(req,res, data, 'recipes')
});


// function htmlOrJson(req, res, data, viewName) {
//   if(req.accepts('html')){
//     res.render(viewName, data)
//   }else{
//     res.json(data)
//   }
// }

module.exports = router;
