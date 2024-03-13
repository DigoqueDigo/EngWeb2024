var express = require('express');
var router = express.Router();
var axios = require('axios');


router.get('/', function(req, res, next) {

    axios.get('http://localhost:3000/compositores')

        .then((resp) => res.status(200).render(
                'compositoresPage',{
                    'title': 'Lista de Compositores',
                    'compositores': resp.data,
                    'voltar': '/',
                    'data': new Date().toLocaleString()
                }))

        .catch(function (error){
            res.status(503).render('error', {'error': error})
        })
});



router.get('/create', function(req, res, next){
    res.render('compositorCreatePage', {
        'title': 'Registar Compositor',
        'date': new Date().toLocaleString()})
})


router.post('/create', function(req, res, next){

    axios.post('http://localhost:3000/compositores/', req.body)

        .then(() => res.status(201).redirect('/compositores'))

        .catch(error => res.status(504).render('error', {'error': error}))
})


router.get('/:idCompositor', function(req, res, next) {

    axios.get('http://localhost:3000/compositores/' + req.params.idCompositor)

        .then((resp) => res.status(200).render(
                'compositorPage',{
                    'title': resp.data.nome + ' | ' + req.params.idCompositor,
                    'compositor': resp.data,
                    'voltar': '/compositores',
                    'data': new Date().toLocaleString()
                }))

        .catch(function (error){
            res.status(505).render('error', {'error': error})
        })
});



router.get('/delete/:idCompositor', function(req, res, next){
    
    axios.delete('http://localhost:3000/compositores/' + req.params.idCompositor)
    
        .then(() => res.status(200).redirect('/compositores'))
    
        .catch((error) => res.status(506).render('error', {'error': error}))
})



router.get('/edit/:idCompositor', function(req, res, next){

    axios.get('http://localhost:3000/compositores/' + req.params.idCompositor)

        .then((resp) => res.status(200).render('compositorEditPage', {
            'title': 'Editar | ' + req.params.idCompositor,
            'compositor': resp.data,
            'data': new Date().toLocaleString()
        }))

        .catch((error) => res.status(507).render('error', {'error': error}))
})



router.post('/edit/:idCompositor', function(req, res, next){

    axios.put('http://localhost:3000/compositores/' + req.params.idCompositor, req.body)

        .then(() => res.status(201).redirect('/compositores'))

        .catch(error => res.status(508).render('error', {'error': error}))
})


module.exports = router;