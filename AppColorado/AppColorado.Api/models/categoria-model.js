'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const categoriaModel = new schema({
    nome: { type: String, required: true, trim: true, index: true },
    descricao: { type: String },
    foto: { type: String },
    ativo: { type: Boolean, required: true, default: true },
    dataCriacao: { type: Date, default: Date.now }
}, { versionKey: false });

categoriaModel.pre('save', next => {
    let dateNow = new Date();

    if(!this.dataCriacao) 
        this.dataCriacao = dateNow;

    next();
});

module.exports = mongoose.model('Categoria', categoriaModel);