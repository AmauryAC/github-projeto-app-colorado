'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const comercioModel = new schema({
    nome: { type: String, required: true, trim: true, index: true },
    descricao: { type: String },
    foto: { type: String },
    horarioFunc: { type: Array },
    areaAtuacao: { type: String },
    ativo: { type: Boolean, required: true, default: true },
    dataCriacao: { type: Date, default: Date.now }
}, { versionKey: false });

comercioModel.pre('save', next => {
    let dateNow = new Date();

    if(!this.dataCriacao) 
        this.dataCriacao = dateNow;

    next();
});

module.exports = mongoose.model('Comercio', comercioModel);