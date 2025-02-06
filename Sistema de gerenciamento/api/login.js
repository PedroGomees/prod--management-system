import express from 'express';
import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import loginController from '../Controllers/loginController.js';
const router = Router();

// Obter __dirname em módulos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


router.get('/', (req, res) => {
    res.render('login', { titulo: "Login" });
    
});


router.post('/save', loginController.login);

export default router;
