const yaml = require('js-yaml');
const fs = require('fs');

const env = !process.env.NODE_ENV ? 'development' : 'production';

const getEnvironmentConfig = () => {
	const fc = fs.readFileSync(`./src/resources/${env}.yaml`, 'utf8');
	return yaml.safeLoad(fc);
};

module.exports = { getEnvironmentConfig };
