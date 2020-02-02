'use strict'

const repository = require('../repositories/avaliacao-repository');
const ctrlBase = require('../bin/base/controller-base');
const validation = require('../bin/helpers/validation');

const _repository = new repository();

module.exports.post = async(req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.estrelas, 'Informe a quantidade de estrelas da sua avaliação.');

    ctrlBase.post(_repository, _validationContract, req, res);
};

module.exports.put = async(req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.estrelas, 'Informe a quantidade de estrelas da sua avaliação.');

    ctrlBase.put(_repository, _validationContract, req, res);
};

module.exports.get = async(req, res) => {
    ctrlBase.get(_repository, req, res);
};

module.exports.getById = async(req, res) => {
    ctrlBase.getById(_repository, req, res);
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