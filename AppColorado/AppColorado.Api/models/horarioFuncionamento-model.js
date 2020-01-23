'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const horarioFuncionamentoModel = new schema({
    diaSemana: { type: String, trim: true, index: true },
    horarioAbertura: { type: String },
    horarioFechamento: { type: String },
    fechado: { type: Boolean },
    ativo: { type: Boolean, required: true, default: true },
    dataCriacao: { type: Date, default: Date.now }
}, { versionKey: false });

horarioFuncionamentoModel.pre('save', next => {
    let dateNow = new Date();

    if(!this.dataCriacao) 
        this.dataCriacao = dateNow;

    next();
});

module.exports = mongoose.model('HorarioFuncionamento', horarioFuncionamentoModel);