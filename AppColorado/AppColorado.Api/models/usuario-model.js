'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const usuarioModel = new schema({
    nome: { type: String, required: true, trim: true, index: true },
    email: { type: String, required: true, trim: true },
    senha: { type: String, required: true },
    foto: { type: String },
    tipo: { type: String, required: true, default: 'user' },
    ativo: { type: Boolean, required: true, default: true },
    dataCriacao: { type: Date, default: Date.now }
}, { versionKey: false });

usuarioModel.pre('save', next => {
    let dateNow = new Date();

    if(!this.dataCriacao)
        this.dataCriacao = dateNow;

    next();
});

module.exports = mongoose.model('Usuario', usuarioModel);