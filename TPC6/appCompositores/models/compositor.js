const mongoose = require('mongoose');


const compositorSchema = new mongoose.Schema({
    nome: String,
    bio: String,
    periodo: String,
    dataNasc: String,
    dataObito: String,
}, {versionKey: false});


module.exports = mongoose.model('compositores', compositorSchema);