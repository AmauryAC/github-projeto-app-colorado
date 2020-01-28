'use strict'

const repository = require('../repositories/servico-repository');
const ctrlBase = require('../bin/base/controller-base');
const validation = require('../bin/helpers/validation');

const _repository = new repository();

module.exports.post = async(req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.nome, 'Informe o nome do serviço.');
    _validationContract.isRequired(req.body.categoria, 'Informe a categoria a que pertence o serviço.');
    _validationContract.isRequired(req.body.comercio, 'Informe o comércio a que pertence o serviço.');
    _validationContract.isTrue(req.body.preco < 0, 'O valor do serviço tem que ser maior que R$0,00.');

    ctrlBase.post(_repository, _validationContract, req, res);
};

module.exports.put = async(req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.nome, 'Informe o nome do serviço.');
    _validationContract.isRequired(req.body.categoria, 'Informe a categoria a que pertence o serviço.');
    _validationContract.isRequired(req.body.comercio, 'Informe o comércio a que pertence o serviço.');
    _validationContract.isTrue(req.body.preco < 0, 'O valor do serviço tem que ser maior que R$0,00.');

    ctrlBase.put(_repository, _validationContract, req, res);
};

module.exports.get = async(req, res) => {
    ctrlBase.get(_repository, req, res);
};

module.exports.getById = async(req, res) => {
    ctrlBase.getById(_repository, req, res);
};

module.exports.getByCategoria = async(req, res) => {
    try {
        let id = req.params.id;

        if(id) {
            let data = await _repository.getByCategoria(id);

            res.status(200).send(data);
        } else {
            res.status(400).send({
                message: 'O parâmetro "id" precisa ser informado.'
            });
        }
    } catch(err) {
        console.log('GET BY ID com erro. Motivo: ', err);

        res.status(500).send({
            message: 'Erro no processo.',
            error: err
        });
    }
};

module.exports.getByComercio = async(req, res) => {
    try {
        let id = req.params.id;

        if(id) {
            let data = await _repository.getByComercio(id);

            res.status(200).send(data);
        } else {
            res.status(400).send({
                message: 'O parâmetro "id" precisa ser informado.'
            });
        }
    } catch(err) {
        console.log('GET BY ID com erro. Motivo: ', err);

        res.status(500).send({
            message: 'Erro no processo.',
            error: err
        });
    }
};

module.exports.delete = async(req, res) => {
    ctrlBase.delete(_repository, req, res);
};