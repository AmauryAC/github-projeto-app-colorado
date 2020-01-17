'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const contatoModel = new schema({
    tipo: { type: String, required: true, trim: true, index: true },
    contato: { type: String, trim: true, index: true },
    ativo: { type: Boolean, required: true, default: true },
    dataCriacao: { type: Date, default: Date.now }
}, { versionKey: false });

contatoModel.pre('save', next => {
    let dateNow = new Date();

    if(!this.dataCriacao) 
        this.dataCriacao = dateNow;

    next();
});

module.exports = mongoose.model('Contato', contatoModel);