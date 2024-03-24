var express = require('express');
var router = express.Router();
var Compositor = require('../controllers/compositor')


router.get('/', function(req, res, next) {

    Compositor.list()

        .then((compositores) => {
            let periodos = new Set()
            compositores.forEach(element => periodos.add(element.periodo))
            res.status(200).render('periodosPage', {
                'title': 'Lista de Períodos',
                'periodos': Array.from(periodos),
                'voltar': '/',
                'data': new Date().toLocaleString()
            })
        })

        .catch(function (error){
            res.status(501).render('error', {'error': error})
        })
})



router.get('/:periodo', function(req, res, next){

    Compositor.findByPeriodo(req.params.periodo)

        .then((compositores) => {
            res.status(200).render('compositoresPage', {
                'title': req.params.periodo + ' - Compositores',
                'compositores': compositores,
                'voltar': '/periodos',
                'data': new Date().toLocaleString()
            })
        })

        .catch(function (error){
            res.status(502).render('error', {'error': error})
        })
})


module.exports = router;