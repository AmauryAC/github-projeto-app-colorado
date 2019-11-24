'use strict'

const mongoose = require('mongoose');

class repositoryBase {
    constructor(model) {
        this._model = mongoose.model(model);
    }

    async create(data) {
        let model = new this._model(data);
        let result = await model.save();

        return result;
    }

    async update(id, data) {
        await this._model.findByIdAndUpdate(id, { $set: data });
        
        let result = this.getById(id);

        return result;
    }

    async getAll() {
        return await this._model.find();
    }

    async getById(id) {
        return await this._model.findById(id);
    }

    async delete(id) {
        return await this._model.findByIdAndDelete(id);
    }
}

module.exports = repositoryBase;