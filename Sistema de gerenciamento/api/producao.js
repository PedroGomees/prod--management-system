import express from 'express';
import { Router } from 'express';

const router = Router();

router.get('/cadastro', (req, res) => {
    res.render('producao', { titulo: "Produção dos Funcionários" }); // Renderiza usando o layout
});

export default router;