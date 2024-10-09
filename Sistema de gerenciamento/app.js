import express from 'express';
import { engine } from 'express-handlebars';
import fs from 'fs';
import path from 'path';
import routes from './api/index.js';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// Obter __dirname em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do Handlebars
app.engine('hbs', engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.listen(port, () => {
    console.log("Server rodando na porta 3000");
});
