'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const categoriaItemModel = new schema({
    nome: { type: String, required: true, trim: true, index: true },
    tipo: { type: String, required: true, trim: true, index: true },
    comercio: { type: schema.Types.ObjectId, ref: 'Comercio', required: true },
    ativo: { type: Boolean, required: true, default: true },
    dataCriacao: { type: Date, default: Date.now }
}, { versionKey: false });

categoriaItemModel.pre('save', next => {
    let dateNow = new Date();

    if(!this.dataCriacao) 
        this.dataCriacao = dateNow;

    next();
});

module.exports = mongoose.model('CategoriaItem', categoriaItemModel);