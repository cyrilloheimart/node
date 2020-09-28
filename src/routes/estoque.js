const { listar } = require('../controller/constrollerEstoque');

const estoque = require('express').Router();

estoque.get('/', listar);

module.exports = estoque;
