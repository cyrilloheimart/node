const express = require('express');
const app = express();
var cors = require('cors');
const { getEnvironmentConfig } = require('./load-config');

const environment = getEnvironmentConfig();

app.use(express.json());
app.use(cors());

const estoque = require('./routes/estoque');
app.use('/estoque', estoque);

app.listen(process.env.PORT || environment['port']);
