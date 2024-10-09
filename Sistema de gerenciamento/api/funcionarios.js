import express from 'express';
import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = Router();

// Obter __dirname em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const funcionariosFilePath = path.join(__dirname, '../funcionarios.json');

// Middleware para tratar os dados do formulário
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Rota para renderizar o formulário de cadastro
router.get('/cadastro', (req, res) => {
    res.render('cadastrar-funcionarios', { titulo: "Cadastro de Funcionários" });
});

// Rota para salvar novos funcionários
router.post('/save', (req, res) => {
    const name = req.body.name;

    if (!name) {
        return res.status(400).send("O nome do funcionário é obrigatório.");
    }

    fs.readFile(funcionariosFilePath, 'utf-8', (err, data) => {
        let funcionarios = [];

        if (!err && data) {
            try {
                funcionarios = JSON.parse(data);
            } catch (parseErr) {
                console.error("Erro ao analisar JSON:", parseErr);
            }
        }

        funcionarios.push({ name });

        fs.writeFile(funcionariosFilePath, JSON.stringify(funcionarios, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Erro ao salvar funcionário");
            }
            res.redirect('/funcionarios/lista');
        });
    });
});

// Rota para listar todos os funcionários
router.get('/lista', (req, res) => {
    fs.readFile(funcionariosFilePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send("Erro ao ler funcionários");
        }

        let funcionarios = [];
        try {
            funcionarios = data ? JSON.parse(data) : [];
        } catch (parseErr) {
            console.error("Erro ao analisar JSON:", parseErr);
            return res.status(500).send("Erro ao processar dados dos funcionários.");
        }

        res.render('lista', { funcionarios, titulo: "Lista de Funcionários" });
    });
});

export default router;
