import url from 'url'
import http from 'http'
import StaticHandler from './handlers/staticHandler.js'
import ServerHandler from './handlers/serverHandler.js'


const server = http.createServer((req,res) => {
    let pathname = url.parse(req.url,true).pathname
    console.log(pathname)
    if (pathname.includes('favicon') || pathname.includes('w3.css'))
        new StaticHandler(req,res).execute(pathname)
    else new ServerHandler(res,res).execute(pathname)
})


server.listen(5188, () => {
    console.log('Server running at http://localhost:5188')
})