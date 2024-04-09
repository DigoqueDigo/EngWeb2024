var express = require('express');
var router = express.Router();
var axios = require('axios')


router.get('/', function(req, res, next) {
    axios.get('http://localhost:5188/pessoas')
        .then(pessoas => res.status(200).render(
            'pessoas', {
                'title': 'Lista de Pessoas',
                'pessoas': pessoas.data,
                'voltar': '/',
                'data': new Date().toLocaleString()}))
        .catch(error => res.status(501).render('error', {'error': error}))
});


router.get('/delete/:idPessoa',function(req, res, next) {
    axios.get('http://localhost:5188/pessoas/delete/' + req.params.idPessoa)
        .then(() => res.status(201).redirect('/pessoas'))
        .catch(error => res.status(502).render('error', {'error': error}))
})


module.exports = router;