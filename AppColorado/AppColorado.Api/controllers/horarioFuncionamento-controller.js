'use strict'

const repository = require('../repositories/horarioFuncionamento-repository');
const ctrlBase = require('../bin/base/controller-base');
const validation = require('../bin/helpers/validation');

const _repository = new repository();

module.exports.post = async(req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.diaSemana, 'Informe o dia da semana.');
    _validationContract.isRequired(req.body.horaAbertura, 'Informe a hora de abertura.');
    _validationContract.isRequired(req.body.horaFechamento, 'Informe a hora de fechamento.');
    _validationContract.isRequired(req.body.aberto, 'Informe se o estabelecimento está aberto ou não.');

    ctrlBase.post(_repository, _validationContract, req, res);
};

module.exports.put = async(req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.diaSemana, 'Informe o dia da semana.');
    _validationContract.isRequired(req.body.horaAbertura, 'Informe a hora de abertura.');
    _validationContract.isRequired(req.body.horaFechamento, 'Informe a hora de fechamento.');
    _validationContract.isRequired(req.body.aberto, 'Informe se o estabelecimento está aberto ou não.');

    ctrlBase.put(_repository, _validationContract, req, res);
};

module.exports.get = async(req, res) => {
    ctrlBase.get(_repository, req, res);
};

module.exports.getById = async(req, res) => {
    ctrlBase.getById(_repository, req, res);
};

module.exports.delete = async(req, res) => {
    ctrlBase.delete(_repository, req, res);
};