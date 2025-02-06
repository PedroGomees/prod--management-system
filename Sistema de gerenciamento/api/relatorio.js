import express from 'express';
import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql'; 
import conn from '../config/db.js';
const router = Router();

// Obter __dirname em módulos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Middleware para tratar os dados do formulário
router.use(express.urlencoded({ extended: true }));
router.use(express.json());


router.get('/', (req, res) => {
    
    const { mes, ano } = req.query; // Obtém o mês e ano da requisição
    const reportQuery = `
       SELECT 
        p.nome AS nome_produto, 
        SUM(pr.quantidade) AS total_quantidade, 
        p.preco_unitario,
        SUM(pr.quantidade * p.preco_unitario) AS valor_total
    FROM 
        producao pr
    JOIN 
        produtos p ON p.nome = pr.nome_produto
    WHERE 
        MONTH(pr.data) = ? AND YEAR(pr.data) = ?
    GROUP BY 
        p.nome, p.preco_unitario`;
        console.log("gerando relatorio",{mes,ano})
    conn.query(reportQuery, [mes, ano], (err, results) => {
        if (err) return res.status(500).send("Erro ao gerar relatório");
        res.render('relatorio', { titulo: "Relatório Mensal de Produção", produtos: results });
    });
});

export default router;