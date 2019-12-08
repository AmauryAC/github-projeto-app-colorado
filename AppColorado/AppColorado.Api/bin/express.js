'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const variables = require('../bin/configuration/variables');

// Routes
const usuarioRouter = require('../routes/usuario-router');
const categoriaRouter = require('../routes/categoria-router');
const servicoRouter = require('../routes/servico-router');
const produtoRouter = require('../routes/produto-router');
const tipoRouter = require('../routes/tipo-router');
const enderecoRouter = require('../routes/endereco-router');
const contatoRouter = require('../routes/contato-router');
const avaliacaoRouter = require('../routes/avaliacao-router');
const comercioRouter = require('../routes/comercio-router');

// Criando/Invocando a Api/Server Web do Express
const app = express();

// Configuração de parse do JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configurando a conexão com o banco de dados
mongoose.connect(variables.Database.connection, { useNewUrlParser: true });

// Configurando as rotas
app.use('/api/usuario', usuarioRouter);
app.use('/api/categoria', categoriaRouter);
app.use('/api/servico', servicoRouter);
app.use('/api/produto', produtoRouter);
app.use('/api/tipo', tipoRouter);
app.use('/api/endereco', enderecoRouter);
app.use('/api/contato', contatoRouter);
app.use('/api/avaliacao', avaliacaoRouter);
app.use('/api/comercio', comercioRouter);

// Exportando nossa Api
module.exports = app;