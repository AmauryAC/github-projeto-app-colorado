'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const horarioFuncionamentoModel = new schema({
    diaSemana: { type: Date, required: true, trim: true, index: true },
    horaAbertura: { type: Date, required: true, trim: true, index: true },
    horaFechamento: { type: Date, required: true, trim: true, index: true },
    aberto: { type: Boolean, required: true, default: true },
    ativo: { type: Boolean, required: true, default: true },
    dataCriacao: { type: Date, default: Date.now }
}, { versionKey: false });

horarioFuncionamentoModel.pre('save', next => {
    let dateNow = new Date();

    if(!this.dataCriacao) 
        this.dataCriacao = dateNow;

    next();
});

module.exports = mongoose.model('HorarioFuncionamento', HorarioFuncionamentoModel);