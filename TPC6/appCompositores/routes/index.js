var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', {
    'title': 'Música Clássica',
    'indexLink1': '/compositores',
    'indexLink2': '/periodos',
    'indexElement1': 'Lista de Compositores',
    'indexElement2': 'Lista de Períodos',
    'data': new Date().toLocaleString()
  })
});


module.exports = router;