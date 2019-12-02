'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const avaliacaoModel = new schema({
    estrelas: { type: String, required: true, index: true },
    comentario: { type: String },
    ativo: { type: Boolean, required: true, default: true },
    dataCriacao: { type: Date, default: Date.now }
}, { versionKey: false });

avaliacaoModel.pre('save', next => {
    let dateNow = new Date();

    if(!this.dataCriacao) 
        this.dataCriacao = dateNow;

    next();
});

module.exports = mongoose.model('Avaliacao', avaliacaoModel);