const express = require('express');
const cors = require('cors');
const routes = require('./routes'); // ./ serve para iniciar que é um arquivo e nao um pacote

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);