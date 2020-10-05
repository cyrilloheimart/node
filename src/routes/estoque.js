const {
	listarCarros,
	buscarCarroPorId,
	incluirCarro,
	filtroCarro,
	excluirCarro,
	calcularIPVAPorModelo,
	calcularValorCarrosVenda,
	download,
	upload,
} = require('../controller/controllerEstoque');

const estoque = require('express').Router();

estoque.get('/', listarCarros);
estoque.get('/valor', calcularValorCarrosVenda);
estoque.get('/buscar/:filtro', filtroCarro);
estoque.get('/:modelo/ipva', calcularIPVAPorModelo);
estoque.get('/:id', buscarCarroPorId);

estoque.get('/download/:nomeArquivo', download);
estoque.post('/upload', upload);

estoque.post('/incluir', incluirCarro);

estoque.delete('/excluir/:id', excluirCarro);

module.exports = estoque;
