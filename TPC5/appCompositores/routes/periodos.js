var express = require('express');
var router = express.Router();
var axios = require('axios')


router.get('/', function(req, res, next) {

    axios.get('http://localhost:3000/compositores')

        .then((resp) => {
            let periodos = new Set()
            resp.data.forEach(element => periodos.add(element.periodo))
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

    axios.get('http://localhost:3000/compositores')

        .then((resp) => {
            res.status(200).render('compositoresPage', {
                'title': req.params.periodo + ' - Compositores',
                'compositores': resp.data.filter(
                    compositor => compositor.periodo == req.params.periodo),
                'voltar': '/periodos',
                'data': new Date().toLocaleString()
            })
        })

        .catch(function (error){
            res.status(502).render('error', {'error': error})
        })
})


module.exports = router;