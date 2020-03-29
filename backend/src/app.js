const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes'); // ./ serve para iniciar que é um arquivo e nao um pacote

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());  //evita que o erro retorne como status 500 e ainda faz o tratamento do retorno de validação

module.exports = app;