import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import session from 'express-session';
import routes from './api/index.js';
import { fileURLToPath } from 'url';
import conn from './config/db.js';

const app = express();
const port = 3000;

// Obter __dirname em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do Handlebars com helper "json"
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        defaultLayout: 'main',
        helpers: {
            json: function (context) {
                return JSON.stringify(context, null, 2);
            }
        }
    })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Configuração da sessão
app.use(session({
    secret: 'diego',  // Troque por um segredo seguro
    resave: false,
    saveUninitialized: false,
    
    cookie: { 
        maxAge: 30 * 60 * 1000, // ⏳ Duração da sessão: 30 minutos (em milissegundos)
        httpOnly: true, // Impede acesso ao cookie via JavaScript do lado do cliente
        secure: false  // Defina como true se estiver usando HTTPS
    }
}));

// Testando a conexão com o banco
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
