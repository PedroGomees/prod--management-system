
import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import session from 'express-session';

import routes from './api/index.js';
import { fileURLToPath } from 'url';
import mysql from 'mysql';

import conn from './config/db.js';

const app = express();
const port = 3000;

    

// Obter __dirname em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do Handlebars
app.engine('hbs', engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//session
app.use(session({
    secret: 'frangoaPassarinho', // Mude para uma string forte
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Coloque `true` se estiver usando HTTPS
}));


conn.connect(err => {
    if (err) {
        console.error("Erro ao conectar ao MySQL:", err);
        return;
    }
    console.log("Conectou ao MYSQL!");
});
app.use(express.static("public"));
// Extrair dados como json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
});
