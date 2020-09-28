let estoque = [{ id: '1' }];

const listar = (req, res) => {
	const id = req.query.id;
	res.status(200).json();
};

module.exports = {
	listar,
};
