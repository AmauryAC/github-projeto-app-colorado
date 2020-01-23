'use strict'

const repository = require('../repositories/comercio-repository');
const ctrlBase = require('../bin/base/controller-base');
const validation = require('../bin/helpers/validation');

const _repository = new repository();

module.exports.post = async(req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.nome, 'Informe o nome do comércio.');
    _validationContract.isRequired(req.body.descricao, 'Informe a descrição do comércio.');
    _validationContract.isRequired(req.body.categoria, 'Informe a categoria do comercio');
    _validationContract.isRequired(req.body.tipo, 'Informe o tipo do comércio.');
    _validationContract.isRequired(req.body.estabFixo, 'Informe se o comércio é um estabelecimento fixo ou não.');

    if(req.body.estabFixo != undefined || req.body.estabFixo != null) {
        if(req.body.estabFixo == 'true') {
            if(req.body.endereco != undefined || req.body.endereco != null) {
                _validationContract.isRequired(req.body.endereco.logradouro, 'Informe o endereço do estabelecimento.');
            }
            else {
                _validationContract.isRequired('', 'Informe o endereço do estabelecimento.');
            }
        }
        else {
            _validationContract.isRequired(req.body.areaAtuacao, 'Informe a área de atuação do comércio.');
        }
    }

    ctrlBase.post(_repository, _validationContract, req, res);
};

module.exports.put = async(req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.nome, 'Informe o nome do comércio.');
    _validationContract.isRequired(req.body.descricao, 'Informe a descrição do comércio.');
    _validationContract.isRequired(req.body.categoria, 'Informe a categoria do comercio');
    _validationContract.isRequired(req.body.tipo, 'Informe o tipo do comércio.');
    _validationContract.isRequired(req.body.estabFixo, 'Informe se o comércio é um estabelecimento fixo ou não.');

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

module.exports.getByUsuario = async(req, res) => {
    try {
        let id = req.params.id;

        if(id) {
            let data = await _repository.getByUsuario(id);

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