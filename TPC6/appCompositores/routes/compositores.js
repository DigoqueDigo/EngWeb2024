var express = require('express');
var router = express.Router();
var Compositor = require('../controllers/compositor')


router.get('/', function(req, res, next) {

    Compositor.list()

        .then((compositores) => res.status(200).render(
                'compositoresPage',{
                    'title': 'Lista de Compositores',
                    'compositores': compositores,
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
    Compositor.insert(req.body)
        .then(() => {res.status(201).redirect('/compositores')})
        .catch(error => res.status(504).render('error', {'error': error}))
})


router.get('/:idCompositor', function(req, res, next) {

    Compositor.findById(req.params.idCompositor)

        .then((compositor) => {
            res.status(200).render('compositorPage',{
                    'title': compositor.nome + ' | ' + req.params.idCompositor,
                    'compositor': compositor,
                    'voltar': '/compositores',
                    'data': new Date().toLocaleString()
                })})

        .catch(function (error){
            res.status(505).render('error', {'error': error})
        })
});



router.get('/delete/:idCompositor', function(req, res, next){
    Compositor.delete(req.params.idCompositor)
        .then(() => res.status(200).redirect('/compositores'))
        .catch((error) => res.status(506).render('error', {'error': error}))
})



router.get('/edit/:idCompositor', function(req, res, next){

    Compositor.findById(req.params.idCompositor)

        .then((compositor) => res.status(200).render('compositorEditPage', {
            'title': 'Editar | ' + req.params.idCompositor,
            'compositor': compositor,
            'data': new Date().toLocaleString()
        }))

        .catch((error) => res.status(507).render('error', {'error': error}))
})


router.post('/edit/:idCompositor', function(req, res, next){
    Compositor.update(req.params.idCompositor,req.body)
        .then(() => res.status(201).redirect('/compositores'))
        .catch(error => res.status(508).render('error', {'error': error}))
})


module.exports = router;