'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const itemModel = new schema({
    nome: { type: String, required: true, trim: true, index: true },
    descricao: { type: String },
    preco: { type: String },
    comercio: { type: schema.Types.ObjectId, ref: 'Comercio', required: true },
    categoria: { type: schema.Types.ObjectId, ref: 'CategoriaItem', required: true },
    ativo: { type: Boolean, required: true, default: true },
    dataCriacao: { type: Date, default: Date.now }
}, { versionKey: false });

itemModel.pre('save', next => {
    let dateNow = new Date();

    if(!this.dataCriacao) 
        this.dataCriacao = dateNow;

    next();
});

module.exports = mongoose.model('Item', itemModel);