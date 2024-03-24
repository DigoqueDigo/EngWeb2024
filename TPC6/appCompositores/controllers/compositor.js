const Compositor = require('../models/compositor')
var ObjectId = require('mongoose').Types.ObjectId; 


module.exports.list = () => {
    return Compositor.find().exec()
}


module.exports.findById = (id) => {
    return Compositor.findOne({_id: new ObjectId(id)}).exec()
}


module.exports.findByPeriodo = (periodo) => {
    return Compositor.find({periodo:periodo}).exec()
}


module.exports.insert = (compositor) => {
    return Compositor.create(compositor)
}


module.exports.update = (id,compositor) => {
    return Compositor.findOneAndUpdate({_id: new ObjectId(id)},compositor,{new :true})
}


module.exports.delete = (id) => {
    return Compositor.deleteOne({_id: new ObjectId(id)})
}