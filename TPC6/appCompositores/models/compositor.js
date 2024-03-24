const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId; 


const compositorSchema = new mongoose.Schema({
    _id:  {
        type: ObjectId,
        required: true
    },
    nome: String,
    bio: String,
    periodo: String,
    dataNasc: String,
    dataObito: String,
}, {versionKey: false});


module.exports = mongoose.model('compositores', compositorSchema);