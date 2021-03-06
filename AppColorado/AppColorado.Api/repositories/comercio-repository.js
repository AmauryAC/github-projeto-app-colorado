'use strict'

require('../models/comercio-model');

const base = require('../bin/base/repository-base');

class comercioRepository {
    constructor() {
        this._base = new base('Comercio');
    }

    async create(data) {
        return await this._base.create(data);
    }

    async update(id, data) {
        return await this._base.update(id, data);
    }

    async getAll() {
        //return await this._base.getAll();
        return await this._base._model.find().populate('categoria', '_id nome');
    }

    async getById(id) {
        return await this._base.getById(id);
    }

    async getByCategoria(id) {
        return await this._base._model.find({ categoria: id });
    }

    async getByUsuario(id) {
        return await this._base._model.find({ usuario: id }).populate('categoria', '_id nome');
    }

    async delete(id) {
        return await this._base.delete(id);
    }
}

module.exports = comercioRepository;