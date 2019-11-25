'use strict'

const repository = require('../repositories/usuario-repository');
const ctrlBase = require('../bin/base/controller-base');
const validation = require('../bin/helpers/validation');
const variables = require('../bin/configuration/variables');

const md5 = require('md5');
const jwt = require('jsonwebtoken');

const _repository = new repository();

module.exports.post = async(req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.nome, 'Informe seu nome.');
    _validationContract.isRequired(req.body.email, 'Informe seu e-mail.');
    _validationContract.isRequired(req.body.senha, 'A senha é obrigatória.');
    _validationContract.isRequired(req.body.senhaConfirmacao, 'A senha de confirmação é obrigatória.');
    _validationContract.isEmail(req.body.email, 'O e-mail informado é inválido.');
    _validationContract.hasMinLen(req.body.senha, 6, 'A senha deve conter entre 6 e 10 caracteres.');
    _validationContract.hasMaxLen(req.body.senha, 10, 'A senha deve conter entre 6 e 10 caracteres.');
    _validationContract.isTrue(req.body.senha != req.body.senhaConfirmacao, 'A senha e a confirmação da senha não coincidem.');

    if(req.body.email) {
        let userIsEmailExists = await _repository.isEmailExists(req.body.email);

        if(userIsEmailExists) {
            _validationContract.isTrue(userIsEmailExists.nome != undefined, `Já existe o email ${req.body.email} cadastrado em nosso sistema.`);
        }
    }

    if(req.body.senha)
        req.body.senha = md5(req.body.senha);

    ctrlBase.post(_repository, _validationContract, req, res);
};

module.exports.put = async(req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.nome, 'Informe seu nome.');
    _validationContract.isRequired(req.body.email, 'Informe seu e-mail.');
    _validationContract.isRequired(req.params.id, 'Informe o "id" do usuário que será editado.');
    _validationContract.isEmail(req.body.email, 'O e-mail informado é inválido.');

    if(req.body.email) {
        let userIsEmailExists = await _repository.isEmailExists(req.body.email);

        if(userIsEmailExists) {
            _validationContract.isTrue(userIsEmailExists.nome != undefined && userIsEmailExists._id != req.params.id, `Já existe o email ${req.body.email} cadastrado em nosso sistema.`);
        }
    }

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

module.exports.authenticate = async(req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.email, 'Informe seu e-mail.');
    _validationContract.isRequired(req.body.senha, 'Informe sua senha.');
    _validationContract.isEmail(req.body.email, 'O e-mail informado é inválido.');

    if(!_validationContract.isValid()) {
        res.status(400).send({
            message: 'Não foi possível efetuar o login',
            validation: _validationContract.errors()
        }).end();
        return;
    }

    let userFound = await _repository.authenticate(req.body.email, req.body.senha);

    if(userFound) {
        res.status(200).send({
            user: userFound,
            token: jwt.sign({ user: userFound }, variables.Security.securityKey)
        });
    } else {
        res.status(404).send({
            message: 'Usuário e/ou senha informados são inválidos!'
        });
    }
};