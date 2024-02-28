import axios from 'axios'


class ServerHandler{


    constructor(req,res){
        this.req = req;
        this.res = res;
        this.pathname = ''
        this.map = {
            '/': () => this.initPage(),
            '/atores': () => this.showAtores(),
            '/atores/A': () => this.showAtor(),
            '/filmes': () => this.showFilmes(),
            '/filmes/F': () => this.showFilme(),
            '/generos': () => this.showGeneros(),
            '/generos/G': () => this.showGenero()
        }
    }


    execute(pathname){

        try{
            this.pathname = pathname
            pathname = pathname.replace(/\/generos\/.+/,'/generos/G')
            pathname = pathname.replace(/\/atores\/.+/,'/atores/A')
            pathname = pathname.replace(/\/filmes\/.+/,'/filmes/F')
            this.map[pathname]()
        }

        catch (error){
            console.error(`${this.pathname} : ${error}`)
            this.res.write('<h1>Página não identificada</h1>')
            this.res.write('<button type="button"><a href="/">Página Inicial</a></button>')
            this.res.end()
        }
    }


    initPage(){
        this.res.write('<h1>Arquivo de Filmes Americanos<h1>')
        this.res.write('<button type="button"><a href="/atores">Índice de Atores</a></button><br><br>')
        this.res.write('<button type="button"><a href="/filmes">Índice de Filmes</a></button><br><br>')
        this.res.write('<button type="button"><a href="/generos">Índice de Géneros</a></button>')
        this.res.end()
    }


    showFilmes(){

        let self = this

        axios.get('http://localhost:3000/filmes')

            .then((resp) => {

                self.res.write('<h1>Arquivo de Filmes Americanos<h1>')
                self.res.write('<h2>Índice de Filmes</h2><ul>')

                resp.data.forEach(element => {
                    self.res.write(`<li><a href="/filmes/${element['_id']['$oid']}">${element.title}</a></li>`)
                });

                self.res.write('</ul>')
                self.res.end('<button type="button"><a href="/">Página Inicial</a></button>')
            })

            .catch(function (error){
                console.error(error)
                self.res.write('<h1>Página não identificada</h1>')
                self.res.write('<button type="button"><a href="/">Página Inicial</a></button>')
                self.res.end()
            })
    }


    showAtores(){

        let self = this

        axios.get('http://localhost:3000/filmes')

            .then((resp) => {

                self.res.write('<h1>Arquivo de Filmes Americanos<h1>')
                self.res.write('<h2>Índice de Atores</h2><ul>')

                let atores = new Set()

                resp.data.forEach(element => {
                    try {element.cast.forEach(ator => atores.add(ator))}
                    catch (error) {}
                })

                atores.forEach(element => {
                    self.res.write(`<li><a href="/atores/${element}">${element}</a></li>`)
                })

                self.res.write('</ul>')
                self.res.end('<button type="button"><a href="/">Página Inicial</a></button>')
            })

            .catch(function (error){
                console.error(error)
                self.res.write('<h1>Página não identificada</h1>')
                self.res.write('<button type="button"><a href="/">Página Inicial</a></button>')
                self.res.end()
            })
    }


    showGeneros(){

        let self = this

        axios.get('http://localhost:3000/filmes')

            .then((resp) => {

                self.res.write('<h1>Arquivo de Filmes Americanos<h1>')
                self.res.write('<h2>Índice de Géneros</h2><ul>')

                let generos = new Set()

                resp.data.forEach(element => {
                    try {element.genres.forEach(genero => generos.add(genero))}
                    catch (error) {}
                })

                generos = Array.from(generos)
                generos.sort()
                generos.forEach(element => {
                    self.res.write(`<li><a href="/generos/${element}">${element}</a></li>`)
                })

                self.res.write('</ul>')
                self.res.end('<button type="button"><a href="/">Página Inicial</a></button>')
            })

            .catch(function (error){
                console.error(error)
                self.res.write('<h1>Página não identificada</h1>')
                self.res.write('<button type="button"><a href="/">Página Inicial</a></button>')
                self.res.end()
            })
    }


    showGenero(){

        let self = this
        let genero = self.pathname.split('/').pop().replaceAll('%20',' ')

        axios.get('http://localhost:3000/filmes')

            .then((resp) => {

                self.res.write('<h1>Arquivo de Filmes Americanos<h1>')
                self.res.write(`<h2>Filmes do Género: ${genero} </h2><ul>`)

                resp.data.forEach(element => {
                    try {
                        if (element.genres.includes(genero))
                            self.res.write(`<li><a href="/filmes/${element['_id']['$oid']}">${element.title}</a></li>`)
                    }
                    catch (error) {}
                })

                self.res.write('</ul>')
                self.res.write('<button type="button"><a href="/generos">Voltar</a></button>')
                self.res.end('<button type="button"><a href="/">Página Inicial</a></button>')
            })

            .catch(function (error){
                console.error(error)
                self.res.write('<h1>Página não identificada</h1>')
                self.res.write('<button type="button"><a href="/">Página Inicial</a></button>')
                self.res.end()
            })
    }


    showAtor(){

        let self = this
        let ator = self.pathname.split('/').pop().replaceAll('%20',' ')

        axios.get('http://localhost:3000/filmes')

            .then((resp) => {

                self.res.write('<h1>Arquivo de Filmes Americanos<h1>')
                self.res.write(`<h2>Filmes do Ator: ${ator} </h2><ul>`)

                resp.data.forEach(element => {
                    try{
                        if (element.cast.includes(ator))
                            self.res.write(`<li><a href="/filmes/${element['_id']['$oid']}">${element.title}</a></li>`)
                    }
                    catch (error) {}
                })

                self.res.write('</ul>')
                self.res.write('<button type="button"><a href="/atores">Voltar</a></button>')
                self.res.end('<button type="button"><a href="/">Página Inicial</a></button>')
            })

            .catch(function (error){
                console.error(error)
                self.res.write('<h1>Página não identificada</h1>')
                self.res.write('<button type="button"><a href="/">Página Inicial</a></button>')
                self.res.end()
            })
    }


    showFilme(){

        let self = this
        let id = self.pathname.split('/').pop().replaceAll('%20',' ')

        axios.get('http://localhost:3000/filmes')

            .then((resp) => {

                let filme = resp.data.find((element) => element['_id']['$oid'] == id)

                self.res.write('<h1>Arquivo de Filmes Americanos<h1>')
                self.res.write(`<h2>Título: ${filme.title}</h2>`)
                self.res.write(`<h3>Ano: ${filme.year}</h3>`)

                self.res.write(`<h3>Cast:</h3><ul>`)
                filme.cast.forEach(element => {
                    self.res.write(`<li><a href="/atores/${element}">${element}</a></li>`)
                })

                self.res.write(`</ul><h3>Género:</h3><ul>`)
                filme.genres.forEach(element => {
                    self.res.write(`<li><a href="/generos/${element}">${element}</a></li>`)
                })

                self.res.write('</ul>')
                self.res.write('<button type="button"><a href="/filmes">Voltar</a></button>')
                self.res.end('<button type="button"><a href="/">Página Inicial</a></button>')
            })

            .catch(function (error){
                console.error(error)
                self.res.write('<h1>Página não identificada</h1>')
                self.res.write('<button type="button"><a href="/">Página Inicial</a></button>')
                self.res.end()
            })
    }
}

export default ServerHandler