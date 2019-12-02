'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const enderecoModel = new schema({
    logradouro: { type: String, required: true, trim: true, index: true },
    numero: { type: Number, required: true },
    complemento: { type: String },
    bairro: { type: String, required: true, trim: true, index: true },
    cidade: { type: String, required: true, trim: true, index: true },
    uf: { type: String, required: true, trim: true, index: true },
    cep: { type: String, required: true, trim: true, index: true },
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