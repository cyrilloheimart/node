const {
	listarCarros,
	buscarCarroPorId,
	incluirCarro,
	filtroCarro,
	excluirCarro,
	calcularIPVAPorModelo,
	calcularValorCarrosVenda,
} = require('../controller/controllerEstoque');

const estoque = require('express').Router();

estoque.get('/', listarCarros);
estoque.get('/valor', calcularValorCarrosVenda);
estoque.get('/buscar/:filtro', filtroCarro);
estoque.get('/:modelo/ipva', calcularIPVAPorModelo);
estoque.get('/:id', buscarCarroPorId);

estoque.post('/incluir', incluirCarro);

estoque.delete('/excluir/:id', excluirCarro);

module.exports = estoque;
