import axios from 'axios'
import Template from "../template.js"

class ServerHandler{


    constructor(req,res){
        this.res = req
        this.res = res
        this.pathname = ''
        this.template = new Template()
        this.functions = {
            '/': () => this.showCompositores(),
            '/compositores': () => this.showCompositores(),
            '/compositores/C' : () => this.showCompositor()
        }
    }


    execute(pathname){
        try{
            this.pathname = pathname
            pathname = pathname.replace(/compositores\/C.*/,'compositores/C')
            this.functions[pathname]()
        }
        catch (error) {this.showErrorPage()}
    }


    showErrorPage(){
        this.res.end(this.template.errorPage())
    }


    showCompositores(){
        let self = this
        axios.get('http://localhost:3000/compositores')
            .then((resp) => self.res.end(self.template.compositoresPage(resp.data)))
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
}

export default ServerHandler