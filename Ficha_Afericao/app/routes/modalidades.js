var express = require('express');
var router = express.Router();
var Pessoa = require('../controllers/pessoa')


// READ MODALIDADES
router.get('/', function(req, res, next) {
    Pessoa.getDesportos()
        .then(response => {
            var desportos = []
            response.forEach(element => desportos.push(element['_id']))
            res.jsonp(desportos)})
            .catch(error => res.status(509).render('error', {'error': error}))
});


// READ PRATICANTES
router.get('/:modalidade', function(req, res, next) {
    Pessoa.getPraticantes(req.params.modalidade)
        .then(response => {
            var praticantes = []
            response.forEach(element => praticantes.push(element['nome']))
            res.jsonp(praticantes)
        })
        .catch(error => res.status(510).render('error', {'error': error}))
});

module.exports = router;