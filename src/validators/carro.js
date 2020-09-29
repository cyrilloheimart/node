function Carro(car) {
	const checkIntegrity = [
		'modelo',
		'marca',
		'cor',
		'chassi',
		'placa',
		'ano',
		'valor',
		'fipe',
		'km',
	];

	let failCheck = [];

	checkIntegrity.forEach((rule) => {
		if (!car[rule]) {
			failCheck.push(`${rule} é obrigatório`);
		}
	});

	return {
		success: failCheck.length ? false : true,
		fieldError: failCheck,
	};
}

module.exports = { Carro };
