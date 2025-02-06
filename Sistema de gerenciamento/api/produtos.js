import express from 'express';
import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import conn from '../config/db.js';
const router = Router();
import moment from 'moment';
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
    const desc = req.body.desc;



    // Verificar se o funcionário existe
    const funcionarioQuery = 'SELECT id FROM funcionario WHERE nome = ?';
    conn.query(funcionarioQuery, [nome], (err, results) => {
        if (err) {
            return res.status(500).send("Erro ao verificar funcionário");
        }
        if (results.length === 0) {
            return res.status(400).send("O funcionário não está cadastrado.");
        }

        const funcionarioId = results[0].id; 

        // Inserir os dados na tabela de produção
        const insertQuery = 'INSERT INTO producao (nome_produto, data, quantidade, funcionario_id, descricao) VALUES (?, ?, ?, ?, ?)';
        conn.query(insertQuery, [product, date, quantidade, funcionarioId,desc,], (err, results) => {
            if (err) {
                return res.status(500).send("Erro ao cadastrar produto");
               
            }
            res.redirect('/produtos/registro'); // Redirecionar após o sucessoto
        });
    });
});

router.get('/lista-producao', (req, res) => {
    const selectQuery = `
        SELECT 
            producao.id,
            producao.nome_produto,
            producao.data,
            producao.quantidade,
            producao.descricao,
            funcionario.nome AS nome_funcionario
        FROM producao
        INNER JOIN funcionario ON producao.funcionario_id = funcionario.id
    `;
    conn.query(selectQuery, (err, results) => {
        if (err) {
            return res.status(500).send("Erro ao listar produtos");
        }

        const producoes = results.map(producao => {
            producao.data = moment(producao.data).format("DD/MM/YY");
            return producao;
        });
        
        res.render('producao', { 
            titulo: "Lista de Produção", 
            producoes 
        });
        console.log(results);
    });
});

router.get('/cadastrar-preco',(req,res)=>{
   
    res.render('preco')
})

router.post("/cadastrar-preco/save",(req,res)=>{
    const nome = req.body.nome;
    const preco = req.body.preco;
    const desc = req.body.desc;

    const insertQuery = `INSERT INTO produtos (nome, preco_unitario,descricao) VALUES (?,?,?)`;
    conn.query(insertQuery,[nome,preco,desc],(err,results)=>{
        if(err){
            return res.status(500).send("Erro ao inserir produto" + err);
        }
        res.redirect("/cadastrar-preco")
    })
   
})

export default router;
