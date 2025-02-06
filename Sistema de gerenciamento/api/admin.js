import express from 'express';
import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import adminController from '../Controllers/adminController.js';

const router = Router();

// Obter __dirname em módulos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para tratar os dados do formulário
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Rota para renderizar o formulário de cadastro
router.get('/cadastrar', (req, res) => {
    res.render('cadastrar-admin', { titulo: "Cadastro de admin" });
});

// Rota para salvar os dados
router.post('/cadastrar/save', adminController.register);

export default router;
