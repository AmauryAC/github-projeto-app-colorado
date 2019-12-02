'use strict'

const repository = require('../repositories/endereco-repository');
const ctrlBase = require('../bin/base/controller-base');
const validation = require('../bin/helpers/validation');

const _repository = new repository();

module.exports.post = async(req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.logradouro, 'Informe o logradouro do seu estabelecimento.');
    _validationContract.isRequired(req.body.numero, 'Informe o número do seu estabelecimento.');
    _validationContract.isRequired(req.body.bairro, 'Informe o bairro do seu estabelecimento.');
    _validationContract.isRequired(req.body.cidade, 'Informe a cidade do seu estabelecimento.');
    _validationContract.isRequired(req.body.uf, 'Informe o estado do seu estabelecimento.');
    _validationContract.isRequired(req.body.cep, 'Informe o CEP do seu estabelecimento.');
    _validationContract.hasMinLen(req.body.numero, 1, 'O número do seu estabelecimento não pode ser menor que um.');
    _validationContract.isFixedLen(req.body.cep, 8, 'CEP inválido: o CEP é composto por 8 caracteres.');

    ctrlBase.post(_repository, _validationContract, req, res);
};

module.exports.put = async(req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.logradouro, 'Informe o logradouro do seu estabelecimento.');
    _validationContract.isRequired(req.body.numero, 'Informe o número do seu estabelecimento.');
    _validationContract.isRequired(req.body.bairro, 'Informe o bairro do seu estabelecimento.');
    _validationContract.isRequired(req.body.cidade, 'Informe a cidade do seu estabelecimento.');
    _validationContract.isRequired(req.body.uf, 'Informe o estado do seu estabelecimento.');
    _validationContract.isRequired(req.body.cep, 'Informe o CEP do seu estabelecimento.');
    _validationContract.hasMinLen(req.body.numero, 1, 'O número do seu estabelecimento não pode ser menor que um.');
    _validationContract.isFixedLen(req.body.cep, 8, 'CEP inválido: o CEP é composto por 8 caracteres.');

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