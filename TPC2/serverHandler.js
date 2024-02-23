import axios from "axios";


class ServerHandler{


    constructor(req,res){
        this.req = req
        this.res = res
        this.pathname = ''
        this.map = {
            '/': () => this.initPage(),
            '/cursos': () => this.listCourses(),
            '/alunos': () => this.listStudents(),
            '/instrumentos': () => this.listInstrumentos(),
            '/cursos/C': () => this.showCourse(),
            '/alunos/A': () => this.showStudent()
        }
    }


    execute(pathname){

        try{
            console.log("Pathname: " + pathname)
            this.pathname = pathname
            pathname = pathname.replace(/C.+/,'C')
            pathname = pathname.replace(/I.+/,'C')
            pathname = pathname.replace(/A.+/,'A')

            console.log(pathname)
            this.map[pathname]()
        }
        catch (error){
            console.error(error)
        }
    }


    initPage(){
        this.res.write('<h1>Escola de Música</h1>')
        this.res.write('<button type="button"><a href="/cursos">Lista de Cursos</a></button><br><br>')
        this.res.write('<button type="button"><a href="/alunos">Lista de Alunos</a></button><br><br>')
        this.res.write('<button type="button"><a href="/instrumentos">Lista de Instrumentos</a></button>')
        this.res.end()
    }


    listCourses(){

        let self = this

        axios.get('http://localhost:3000/cursos?_sort=designacao')

            .then((resp) => {

                self.res.write('<h1>Escola de Música</h1>')
                self.res.write('<h2>Cursos Disponíveis </h2><ul>')

                resp.data.forEach(element => {
                    self.res.write('<li><a href="/cursos/' + element.id + '">' + element.designacao + '</a></li>')
                });

                self.res.write('</ul>')
                self.res.write('<button type="button"><a href="/">Página Inicial</a></button>')
                self.res.end()
            })

            .catch(function (error){
                console.log(error)
                self.res.write('<h2>Página não identificada</h2>')
                self.res.end()
            })
    }


    listStudents(){

        let self = this

        axios.get('http://localhost:3000/alunos?_sort=nome')

            .then((resp) => {

                self.res.write('<h1>Escola de Música</h1>')
                self.res.write('<h2>Lista de Alunos</h2><ul>')

                resp.data.forEach(element => {
                    self.res.write('<li><a href="/alunos/' + element.id + '">' + element.nome + '</a></li>')
                })

                self.res.write('</ul>')
                self.res.write('<button type="button"><a href="/">Página Inicial</a></button>')
                self.res.end()
            })

            .catch(function (error){
                console.log(error)
                self.res.write('<h2>Página não identificada</h2>')
                self.res.end()
            })
    }


    listInstrumentos(){

        let self = this

        axios.get('http://localhost:3000/instrumentos?_sort=%23text')

            .then((resp) => {

                self.res.write('<h1>Escola de Música</h1>')
                self.res.write('<h2>Lista de Instrumentos</h2><ul>')

                resp.data.forEach(element => {
                    self.res.write('<li>' + element['#text'] + '</li>')
                })

                self.res.write('</ul>')
                self.res.write('<button type="button"><a href="/">Página Inicial</a></button>')
                self.res.end()
            })

            .catch(function (error){
                console.log(error)
                self.res.write('<h2>Página não identificada</h2>')
                self.res.end()
            })
    }


    showCourse(){

        let self = this

        axios.get('http://localhost:3000/cursos?id=' + self.pathname.split('/').pop())

            .then((resp) =>{

                let course = resp.data.pop()

                self.res.write('<h1>Escola de Música</h1>')
                self.res.write('<h2>' + course.designacao + '</h2>')
                self.res.write('<p><b>ID: </b>' + course.id + '</p>')
                self.res.write('<p><b>Duração: </b>' + course.duracao + 'h</p>')
                self.res.write('<p><b>Instrumento: </b>' + course.instrumento['#text'] + '</p>')
                self.res.write('<button type="button"><a href="/cursos">Voltar</a></button>')
                self.res.write('<button type="button"><a href="/">Página Inicial</a></button>')
                self.res.end()
            })

            .catch(function (error){
                console.log(error)
                self.res.write('<h2>Página não identificada</h2>')
                self.res.end()
            })
    }


    showStudent(){

        let self = this

        axios.get('http://localhost:3000/alunos?id=' + self.pathname.split('/').pop())

            .then((resp) => {

                let student = resp.data.pop()

                self.res.write('<h1>Escola de Música</h1>')
                self.res.write('<h2>' + student.nome + '</h2>')
                self.res.write('<p><b>ID: </b>' + student.id + '</b></p>')
                self.res.write('<p><b>Ano: </b>' + student.anoCurso + '</p>')
                self.res.write('<p><b>Curso: </b><a href="/cursos/' + student.curso + '">' + student.curso + '</a></p>')
                self.res.write('<p><b>Data de Nascimento: </b>' + student.dataNasc + '</p>')
                self.res.write('<button type="button"><a href="/alunos">Voltar</a></button>')
                self.res.write('<button type="button"><a href="/">Página Inicial</a></button>')
                self.res.end();
            })

            .catch(function (error){
                console.log(error)
                self.res.write('<h1>Página não identificada</h1>')
                self.res.end()
            })
    }
}


export default ServerHandler