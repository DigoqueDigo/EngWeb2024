const Pessoa = require('../models/pessoa')
var ObjectId = require('mongoose').Types.ObjectId; 


module.exports.list = () => {
    return Pessoa.find().exec()
}


module.exports.findById = (id) => {
    return Pessoa.findOne({_id: new ObjectId(id)}).exec()
}


module.exports.insert = (pessoa) => {
    return Pessoa.create(pessoa)
}


module.exports.update = (id,pessoa) => {
    return Pessoa.findOneAndUpdate({_id: new ObjectId(id)},pessoa,{new :true})
}


module.exports.delete = (id) => {
    return Pessoa.deleteOne({_id: new ObjectId(id)})
}


module.exports.getDesportos = () => {
    return Pessoa.aggregate([
        { $unwind: "$desportos" },
        { $group: { _id: "$desportos" } },
        { $sort: { "_id": 1 } }
      ])
}


module.exports.getPraticantes = (modalidade) => {
    return Pessoa
        .find({desportos: modalidade}, {_id: 0, nome: 1})
        .exec()
}