import express from 'express';
import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import conn from '../config/db.js';
const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const funcionariosFilePath = path.join(__dirname, '../funcionarios.json');
const filePath = path.join(__dirname, '../registro.json');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/registro', (req, res) => {
    res.render('registro', { titulo: "Registro de Vendas" }); 
});



// Rota POST para salvar a produção
router.post('/registro/save', (req, res) => {
    const product = req.body.product;
    const date = req.body.date;
    const nome = req.body.name;
    const quantidade = req.body.quant; 



    // Verificar se o funcionário existe
    const funcionarioQuery = 'SELECT id FROM funcionario WHERE nome = ?';
    conn.query(funcionarioQuery, [nome], (err, results) => {
        if (err) {
            return res.status(500).send("Erro ao verificar funcionário");
        }
        if (results.length === 0) {
            return res.status(400).send("O funcionário não está cadastrado.");
        }

        const funcionarioId = results[0].id; // Pegar o ID do funcionário

        // Inserir os dados na tabela de produção
        const insertQuery = 'INSERT INTO producao (nome_produto, data, quantidade, funcionario_id) VALUES (?, ?, ?, ?)';
        conn.query(insertQuery, [product, date, quantidade, funcionarioId], (err, results) => {
            if (err) {
                return res.status(500).send("Erro ao cadastrar produto");
               
            }
            res.redirect('/produtos/registro'); // Redirecionar após o sucessoto
        });
    });
});

router.get('/lista-producao', (req, res) => {
    const selectQuery = 'SELECT * FROM producao';
    conn.query(selectQuery, (err, results) => {
        if (err) {
            return res.status(500).send("Erro ao listar produtos");
        }
        res.render('producao', { titulo: "Lista de Produção", producoes: results });
        
    });
});
export default router;
