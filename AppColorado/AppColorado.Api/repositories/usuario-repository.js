'use strict'

require('../models/usuario-model');

const base = require('../bin/base/repository-base');

class usuarioRepository {
    constructor() {
        this._base = new base('Usuario');
        this._projection = 'nome email _id tipo';
    }

    async isEmailExists(_email) {
        return this._base._model.findOne({ email: _email }, this._projection);
    }

    async create(data) {
        let createdUser = await this._base.create(data);

        return this._base._model.findById(createdUser._id, this._projection);
    }

    async update(id, data) {
        let updatedUser = await this._base.update(id, {
            nome: data.nome,
            email: data.email,
            foto: data.foto
        });

        return this._base._model.findById(updatedUser._id, this._projection);
    }

    async getAll() {
        return await this._base._model.find({}, this._projection);
    }

    async getById(id) {
        return await this._base._model.findById(id, 'nome email _id foto tipo');
    }

    async delete(id) {
        return await this._base.delete(id);
    }
}

module.exports = usuarioRepository;