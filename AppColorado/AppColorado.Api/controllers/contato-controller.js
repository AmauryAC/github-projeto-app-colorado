'use strict'

const repository = require('../repositories/contato-repository');
const ctrlBase = require('../bin/base/controller-base');
const validation = require('../bin/helpers/validation');

const _repository = new repository();

module.exports.post = async(req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.tipo, 'Informe o tipo do contato.');
    _validationContract.isRequired(req.body.contato, 'Informe os dados contato.');

    ctrlBase.post(_repository, _validationContract, req, res);
};

module.exports.put = async(req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.tipo, 'Informe o tipo do contato.');
    _validationContract.isRequired(req.body.contato, 'Informe os dados contato.');

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