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

// Rota para renderizar o formulário de cadastro
router.get('/cadastro', (req, res) => {
    res.render('cadastrar-funcionarios', { titulo: "Cadastro de Funcionários" });
});

// Rota para salvar os dados
router.post('/save', (req, res) => {
    const name = req.body.name;

    if (!name) {
        return res.status(400).send("O nome do funcionário é obrigatório.");
    }

    const insertQuery = 'INSERT INTO funcionario (nome) VALUES (?)';
    conn.query(insertQuery, [name], (err, results) => {
        if (err) {
            return res.status(500).send("Erro ao cadastrar funcionário");
        }
        res.redirect('/funcionarios/cadastro');
    });
});

// Rota para mostrar funcionarios
router.get('/lista', (req, res) => {
    const selectQuery = 'SELECT * FROM funcionario';
    conn.query(selectQuery, (err, results) => {
        if (err) {
            return res.status(500).send("Erro ao listar funcionários");
        }
        res.render('lista', { titulo: "Lista de Funcionários", funcionarios: results });
        
    });
});

//Rota pra deletar funcionarios
router.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    const deleteQuery = 'DELETE FROM funcionario WHERE id = ?';

    conn.query(deleteQuery, [id], (err, results) => {
        if (err) {
            return res.status(500).send("Erro ao remover funcionário");
        }
        res.redirect('/funcionarios/lista');
    });
});

function atualizarNome(id,novoNome){
    const query = 'UPDATE funcionario SET nome = ? WHERE id = ?';
conn.query(query,[novoNome,5],(err,result)=>{
    if(err){
        console.error("Erro ao atualizar nome")
        return;
    }
    console.log("Nome atualizado para"+ novoNome )
})}



export default router;
