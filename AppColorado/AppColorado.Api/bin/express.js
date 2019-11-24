'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const variables = require('../bin/configuration/variables');

// Routes
const usuarioRouter = require('../routes/usuario-router');

// Criando/Invocando a Api/Server Web do Express
const app = express();

// Configuração de parse do JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configurando a conexão com o banco de dados
mongoose.connect(variables.Database.connection, { useNewUrlParser: true });

// Configurando as rotas
app.use('/api/usuario', usuarioRouter);

// Exportando nossa Api
module.exports = app;