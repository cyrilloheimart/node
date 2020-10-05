const uuidv4 = require('../utils/uuid4');
const { Carro } = require('../validators/carro');

var formidable = require('formidable');
const fsextra = require('fs-extra');
const fs = require('fs');

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
		url:
			'https://s2.glbimg.com/cLTt7HGaUl4FXQTPCPuAxNDmcBY=/620x413/e.glbimg.com/og/ed/f/original/2017/07/20/novo_up_pepper_8.jpg',
	},
	{
		id: 'ae153c8e-262b-45b8-ad90-63b0d34f79ba',
		modelo: 'GOL',
		marca: 'VW',
		cor: 'PRETO',
		chassi: '239872323232',
		placa: 'APK-2333',
		ano: 2018,
		valor: 18000.25,
		fipe: 22000.5,
		km: 400,
		url:
			'https://s2.glbimg.com/M4nmIlX0O45jbCKGWGeO-oUU1vM=/620x413/e.glbimg.com/og/ed/f/original/2019/02/19/gol.jpg',
	},
	{
		id: '8bd5e2d4-a113-467a-b765-68b02a384bfd',
		modelo: 'C180',
		marca: 'Mercedes',
		cor: 'prata',
		chassi: '2323232',
		placa: 'MRA-3233',
		ano: 2020,
		valor: 120000.25,
		fipe: 143000.5,
		km: 1,
		url:
			'https://s2.glbimg.com/s3BXiRXWfbU8AuILhoYqUEmCH70=/512x320/smart/e.glbimg.com/og/ed/f/original/2016/07/23/c180-2016.png',
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

const download = (req, res) => {
	const { nomeArquivo } = req.params;

	try {
		let readStream = fs.createReadStream('./src/storage/' + nomeArquivo);

		readStream.on('open', function () {
			readStream.pipe(res);
		});
	} catch (err) {
		res.status(500).send('não foi possível realizar o download do arquivo.');
	}
};

const upload = (req, res) => {
	var form = new formidable.IncomingForm();
	form.parse(req, async function (err, fields, files) {
		const { type, name, path, size } = files.arquivo;

		if (size > 111110000) {
			res.status(400).send('Tamanho do arquivo inválido');
		}

		if (type.indexOf('image/png') != -1) {
			try {
				await fsextra.move(path, './src/storage/' + name);
				res.status(200).send('Upload executado!');
			} catch (err) {
				res.status(400).send('Arquivo já existe');
			}
		} else {
			res.status(400).send('Tipo inválido');
		}
	});
};

module.exports = {
	upload,
	listarCarros,
	buscarCarroPorId,
	incluirCarro,
	filtroCarro,
	excluirCarro,
	calcularIPVAPorModelo,
	calcularValorCarrosVenda,
	download,
};
