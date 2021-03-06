'use strict'

require('../models/avaliacao-model');

const base = require('../bin/base/repository-base');

class avaliacaoRepository {
    constructor() {
        this._base = new base('Avaliacao');
    }

    async create(data) {
        return await this._base.create(data);
    }

    async update(id, data) {
        return await this._base.update(id, data);
    }

    async getAll() {
        return await this._base.getAll();
    }

    async getById(id) {
        return await this._base.getById(id);
    }

    async getByComercio(id) {
        return await this._base._model.find({ comercio: id }).populate('usuario', '_id nome foto');;
    }

    async delete(id) {
        return await this._base.delete(id);
    }
}

module.exports = avaliacaoRepository;