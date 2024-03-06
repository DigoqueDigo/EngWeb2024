import axios from 'axios'
import Template from "../template.js"

class ServerHandler{


    constructor(req,res){
        this.res = req
        this.res = res
        this.pathname = ''
        this.template = new Template()
        this.functions = {
            '/': () => this.showInitialPage(),
            '/compositores': () => this.showCompositores(),
            '/compositores/C' : () => this.showCompositor(),
            '/periodos': () => this.showPeriodos(),
            '/periodos/P': () => this.showArtistasPeriodo()
        }
    }


    execute(pathname){
        try{
            this.pathname = pathname
            pathname = pathname.replace(/compositores\/C.*/,'compositores/C')
            pathname = pathname.replace(/periodos\/.*/,'periodos/P')
            this.functions[pathname]()
        }
        catch (error) {this.showErrorPage()}
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
}

export default ServerHandler