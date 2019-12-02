'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const tipoModel = new schema({
    tipo: { type: String, required: true, trim: true, index: true },
    estabFixo: { type: Boolean, required: true, default: true },
    ativo: { type: Boolean, required: true, default: true },
    dataCriacao: { type: Date, default: Date.now }
}, { versionKey: false });

tipoModel.pre('save', next => {
    let dateNow = new Date();

    if(!this.dataCriacao) 
        this.dataCriacao = dateNow;

    next();
});

module.exports = mongoose.model('Tipo', tipoModel);