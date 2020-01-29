'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const contatoSchema = require('./contato-model').schema;
const enderecoSchema = require('./endereco-model').schema;
const horarioFuncSchema = require('./horarioFuncionamento-model').schema;

const comercioModel = new schema({
    nome: { type: String, required: true, trim: true, index: true },
    descricao: { type: String, required: true },
    foto: { type: String },
    categoria: { type: schema.Types.ObjectId, ref: 'Categoria', required: true },
    usuario: { type: schema.Types.ObjectId, ref: 'Usuario', required: true },
    //tipo: [{ type: String, required: true }],
    vendProdutos: { type: Boolean, required: true },
    prestServicos: { type: Boolean, required: true },
    estabFixo: { type: Boolean, required: true },
    contatos: [{ type: contatoSchema }],
    endereco: { type: enderecoSchema },
    areaAtuacao: { type: String },
    horarioFunc: [{ type: horarioFuncSchema }],
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