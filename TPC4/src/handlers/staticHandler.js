import fs from 'fs'


class StaticHandler{


    constructor(req,res){
        this.req = req
        this.res = res
    }


    execute(filename){

        let self = this
        fs.readFile('../public/' + filename.split('/').pop(), function(error, data){
            if (error) throw error;
            self.res.end(data) ;
        })
    }
}

export default StaticHandler
