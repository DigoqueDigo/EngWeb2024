import axios from 'axios'
import querystring from 'querystring'
import Template from "../template.js"


class ServerHandler{


    constructor(req,res){
        this.req = req
        this.res = res
        this.pathname = ''
        this.template = new Template()
        this.functions = {
            'GET': {
                '/': () => this.showInitialPage(),
                '/periodos': () => this.showPeriodos(),
                '/periodos/P': () => this.showArtistasPeriodo(),
                '/compositores': () => this.showCompositores(),
                '/compositores/C': () => this.showCompositor(),
                '/compositores/edit': () => this.editCompositor(),
                '/compositores/delete': () => this.deleteCompositor()
            },
            'POST': {
                '/compositores/edit': () => this.updateCompositor()
            }
        }
    }


    execute(pathname){
        try{
            this.pathname = pathname
            pathname = pathname.replace(/periodos\/.*/,'periodos/P')
            pathname = pathname.replace(/compositores\/C.*/,'compositores/C')
            pathname = pathname.replace(/compositores\/edit\/\w.*/,'compositores/edit')
            pathname = pathname.replace(/compositores\/delete\/\w*/,'compositores/delete')
            this.functions[this.req.method][pathname]()
        }
        catch (error) {
            console.error(error)
            this.showErrorPage()}
    }


    showErrorPage(){
        this.res.end(this.template.errorPage())
    }


    showInitialPage(){
        this.res.end(this.template.initialPage())
    }


    showCompositores(){
        let self = this
        axios.get('http://localhost:3000/compositores')
            .then((resp) => self.res.end(self.template.compositoresPage(
                'Lista de Compositores',resp.data,'/')))
            .catch(function (error){
                console.error(error)
                self.showErrorPage()
            })
    }


    showCompositor(){
        let self = this
        axios.get('http://localhost:3000/compositores/' + self.pathname.split('/').pop())
            .then((resp) => self.res.end(self.template.compositorPage(resp.data)))
            .catch(function (error){
                console.error(error)
                self.showErrorPage()
            })
    }


    showPeriodos(){
        let self = this
        axios.get('http://localhost:3000/compositores')
        .then((resp) => {
            let periodos = new Set()
            resp.data.forEach(element => periodos.add(element.periodo));
            self.res.end(self.template.periodosPage(periodos))
        })
        .catch(function (error){
            console.error(error)
            self.showErrorPage()
        })
    }


    showArtistasPeriodo(){
        let self = this
        let periodo = self.pathname.split('/').pop()
        axios.get('http://localhost:3000/compositores?periodo=' + periodo)
            .then((resp) => self.res.end(self.template.compositoresPage(
                'Lista de Compositores - '+periodo,resp.data,'/periodos')))
            .catch(function (error){
                console.error(error)
                self.showErrorPage()
            })
    }


    editCompositor(){
        let self = this
        axios.get('http://localhost:3000/compositores/' + self.pathname.split('/').pop())
            .then((resp) => self.res.end(self.template.editCompositor(resp.data)))
            .catch(function (error){
                console.error(error)
                self.showErrorPage()
            })
    }


    deleteCompositor(){
        let self = this
        axios.delete('http://localhost:3000/compositores/' + self.pathname.split('/').pop())
            .then(async (resp) => {
                let compositores = await axios.get('http://localhost:3000/compositores/')
                self.res.end(self.template.compositoresPage('Lista de Compositores',compositores.data,'/'))
            })
            .catch(function (error){
                console.error(error)
                self.showErrorPage()
            })
    }


    updateCompositor(){
        let self = this
        self.collectRequestBodyData(self.req, result => {            
            axios.put('http://localhost:3000/compositores/' + this.pathname.split('/').pop(), result)
                .then(async (resp) => {
                    let compositores = await axios.get('http://localhost:3000/compositores/')
                    self.res.end(self.template.compositoresPage('Lista de Compositores',compositores.data,'/'))
                })
                .catch(function (error){
                    console.error(error)
                    self.showErrorPage()
                })
        })
    }


    collectRequestBodyData(request, callback) {

        if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
            let body = '';
            request.on('data', chunk => body += chunk.toString());
            request.on('end', () => callback(querystring.parse(body)));
        }

        else callback(null);
    }
}

export default ServerHandler