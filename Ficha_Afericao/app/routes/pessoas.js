var express = require('express');
var router = express.Router();
var Pessoa = require('../controllers/pessoa')


// READ PESSOAS
router.get('/', function(req, res, next) {
    Pessoa.list()
        .then(response => res.jsonp(response))
        .catch(error => res.jsonp(error))
});


// READ PESSOA
router.get('/:idPessoa', function(req, res, next) {
    Pessoa.findById(req.params.idPessoa)
        .then(response => res.jsonp(response))
        .catch(error => res.jsonp(error))
});


// CREATE PESSOA
router.post('/', function(req, res, next){
    Pessoa.insert(req.body)
        .then(() => {res.status(201).end()})
        .catch(error => res.status(504).render('error', {'error': error}))
})


// UPDATE PESSOA
router.post('/idPessoa', function(req, res, next){
    Pessoa.update(req.params.idPessoa,req.body)
        .then(() => res.status(201).end())
        .catch(error => res.status(508).render('error', {'error': error}))
})


// DELETE PESSOA
router.get('/delete/:idPessoa', function(req, res, next){
    Pessoa.delete(req.params.idPessoa)
        .then(() => res.status(200).end())
        .catch((error) => res.status(506).render('error', {'error': error}))
})


module.exports = router;