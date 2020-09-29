const uuidv4 = require('../utils/uuid4');
const { Carro } = require('../validators/carro');

let estoque = [
	{
		id: 'ae153c8e-262b-45b8-ad90-62b0834f79ba',
		modelo: 'UP',
		marca: 'VW',
		cor: 'Azul',
		chassi: '239872323232',
		placa: 'APK-3332',
		ano: 2020,
		valor: 35000.25,
		fipe: 34000.5,
		km: 235,
	},
];

const listarCarros = (req, res) => {
	res.status(200).json(estoque);
};

const buscarCarroPorId = (req, res) => {
	const { id } = req.params;
	const car = estoque.find((x) => x.id === id);
	if (car) {
		res.status(200).send(car);
	} else {
		res.status(404).send();
	}
};

const incluirCarro = (req, res) => {
	let carro = req.body;
	const validator = Carro(carro);

	if (validator.success) {
		carro = { id: uuidv4(), ...carro };
		estoque.push(carro);
		res.status(200).send();
	} else {
		res.status(400).send(validator.fieldError);
	}
};

const filtroCarro = (req, res) => {
	const { filtro } = req.params;
	const { s } = req.query;
	const cars = estoque.filter((x) => x[filtro] === s);

	if (cars) {
		res.status(200).send(cars);
	} else {
		res.status(404).send();
	}
};

const excluirCarro = (req, res) => {
	const { id } = req.params;
	const index = estoque.findIndex((x) => x.id === id);

	if (index !== -1) {
		estoque.splice(index, 1);
		res.status(200).send();
	} else {
		res.status(404).send();
	}
};

const calcularIPVAPorModelo = (req, res) => {
	const { modelo } = req.params;
	const { base } = req.query;
	let cars = estoque.filter((x) => x.modelo === modelo);

	cars = cars.map((car) => {
		return {
			...car,
			ipva: (Number(base) / 100) * car.fipe,
		};
	});

	res.status(200).json(cars);
};

const calcularValorCarrosVenda = (req, res) => {
	let valor = estoque.reduce((valor, item) => {
		valor += parseFloat(item.valor);
		return valor;
	}, 0);

	res.status(200).json(valor);
};

module.exports = {
	listarCarros,
	buscarCarroPorId,
	incluirCarro,
	filtroCarro,
	excluirCarro,
	calcularIPVAPorModelo,
	calcularValorCarrosVenda,
};
