'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const enderecoModel = new schema({
    logradouro: { type: String, trim: true, index: true },
    numero: { type: Number },
    complemento: { type: String },
    bairro: { type: String, trim: true, index: true },
    cidade: { type: String, trim: true, index: true },
    uf: { type: String, trim: true, index: true },
    cep: { type: String },
    ativo: { type: Boolean, required: true, default: true },
    dataCriacao: { type: Date, default: Date.now }
}, { versionKey: false });

enderecoModel.pre('save', next => {
    let dateNow = new Date();

    if(!this.dataCriacao) 
        this.dataCriacao = dateNow;

    next();
});

module.exports = mongoose.model('Endereco', enderecoModel);