'use strict'

const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');

const itemSchema = require('./item-model').schema;

const servicoModel = extendSchema(itemSchema, {}, { versionKey: false });

module.exports = mongoose.model('Servico', servicoModel);