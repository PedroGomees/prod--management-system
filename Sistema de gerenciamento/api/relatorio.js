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


router.get('/', (req,res)=>{
    const reportQuery = 'SELECT nome_produto, SUM(quantidade) AS total_quantidade FROM producao GROUP by nome_produto';
    conn.query(reportQuery,(err,results)=>{
if(err){
   return res.status(500).send(err)

}
res.render("relatorio",{titulo:"Relatório de produtos", produtos: results})
    })
})

export default router;