import url from 'url'
import http from 'http'
import ServerHandler from "./serverHandler.js"


const server = http.createServer((req,res) => {
    res.writeHeader(200, {'Content-Type': 'text/html; charset=utf-8'})
    new ServerHandler(req,res).execute(url.parse(req.url,true).pathname)
})


server.listen(5188, () => {
    console.log('Server running at http://localhost:5188/')})