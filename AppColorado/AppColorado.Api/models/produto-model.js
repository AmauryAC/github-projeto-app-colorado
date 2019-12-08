'use strict'

const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');

const itemSchema = require('./item-model').schema;

const produtoModel = extendSchema(itemSchema, {
    foto: { type: String }
}, { versionKey: false });

module.exports = mongoose.model('Produto', produtoModel);