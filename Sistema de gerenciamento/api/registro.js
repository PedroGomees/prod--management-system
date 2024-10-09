import express from 'express';
import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();

// Obter __filename e __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const funcionariosFilePath = path.join(__dirname, '../funcionarios.json');
const filePath = path.join(__dirname, '../registro.json');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/', (req, res) => {
    res.render('registro', { titulo: "Registro de Vendas" }); 
});

router.post('/save', (req, res) => {
    const product = req.body.product;
    const date = req.body.date;
    const nome = req.body.name;

    if (!nome || !date || !product) {
        return res.send("Todos os dados devem ser preenchidos");
    }

    funcionarioValidar(nome, (err, funcionarioExists) => {
        if (err) {
            return res.status(500).send("Erro ao verificar funcionário");
        }
        if (!funcionarioExists) {
            return res.status(400).send("O funcionário não está cadastrado.");
        }

        fs.readFile(filePath, 'utf-8', (err, data) => {
            let produtos = [];
            if (!err && data) {
                produtos = JSON.parse(data);
            }
            produtos.push({ product, nome, date });

            fs.writeFile(filePath, JSON.stringify(produtos, null, 2), (err) => {
                if (err) {
                    return res.status(500).send("Erro ao cadastrar produto");
                }
                res.redirect('/registro');
            });
        });
    });
});

function funcionarioValidar(nome, callback) {
    fs.readFile(funcionariosFilePath, 'utf-8', (err, data) => {
        if (err) {
            return callback(err, null);
        }
        let funcionarios = [];
        if (data) {
            funcionarios = JSON.parse(data);
        }
        const funcionarioExists = funcionarios.some(funcionario => funcionario.name.toLowerCase() === nome.toLowerCase());
        callback(null, funcionarioExists);
    });
}

export default router;
