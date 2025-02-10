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
router.post('/registro/save', async (req, res) => {
    try {
        const { product, date, name, quant, desc } = req.body;

        // Verificar se o funcionário existe
        const funcionarioQuery = 'SELECT id FROM funcionario WHERE nome = ?';
        const [results] = await conn.query(funcionarioQuery, [name]);

        if (results.length === 0) {
            return res.status(400).send("O funcionário não está cadastrado.");
        }

        const funcionarioId = results[0].id;

        // Inserir os dados na tabela de produção
        const insertQuery = 'INSERT INTO producao (nome_produto, data, quantidade, funcionario_id, descricao) VALUES (?, ?, ?, ?, ?)';
        await conn.query(insertQuery, [product, date, quant, funcionarioId, desc]);

        res.redirect('/produtos/registro'); // Redirecionar após o sucesso
    } catch (error) {
        console.error("Erro ao cadastrar produto:", error);
        res.status(500).send("Erro ao cadastrar produto.");
    }
});

// Pagina que mostra filtro de produção
router.get('/lista-producao', (req, res) => {
    const query = `SELECT id, nome FROM funcionario`;

    conn.query(query, (error, results) => {
        if (error) {
            console.error("Erro ao buscar funcionários:", error);
            return res.status(500).send("Erro ao carregar funcionários.");
        }

        console.log(results);
        res.render('producao-home', {
            titulo: "Filtragem de Produção",
            funcionarios: results
        });
    });
});

router.get('/lista-producao/:id', (req, res) => {
    const funcionarioID = req.params.id;
 
    const query = `
        SELECT p.nome_produto, p.quantidade, p.data, f.nome AS nome_funcionario
        FROM producao p
        JOIN funcionario f ON p.funcionario_id = f.id
        WHERE p.funcionario_id = ?`;

    conn.query(query, [funcionarioID], (error, results) => {
        if (error) {
            console.error("Erro ao buscar produção:", error);
            return res.status(500).send("Erro ao carregar produção.");
        }

        results.forEach(produto => {
            produto.data = moment(produto.data).format("DD/MM/YY");
        });

        // ✅ AGORA o res.render está dentro do callback!
        res.render('producao-funcionario', {
            titulo: "Produção do Funcionário",
            produtos: results
        });
    });
});



router.get('/cadastrar-preco',(req,res)=>{
   
    res.render('preco')
})

router.post("/cadastrar-preco/save", async (req, res) => {
    try {
        const { nome, preco, desc } = req.body;

        const insertQuery = `INSERT INTO produtos (nome, preco_unitario, \`descricao\`) VALUES (?, ?, ?)`

         conn.query(insertQuery, [nome, preco, desc]);

        res.redirect("/cadastrar-preco");
    } catch (error) {
        console.error("Erro ao inserir produto:", error);
        res.status(500).send("Erro ao inserir produto.");
    }
});
export default router;
