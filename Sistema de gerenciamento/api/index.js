import express from 'express';
import path from 'path';
import conn from '../config/db.js';
const router = express.Router();

// Rota para a página inicial
router.get("/", (req, res) => {
    res.render("home", { titulo: "Página Inicial" }); // Renderiza o template de home
});

// Importando rotas

import manutencaoRouter from './manutencao.js';
import tarefasRouter from './tarefas.js';
import registroRouter from './produtos.js';
import funcionariosRouter from './funcionarios.js';
import homeRouter from './home.js';
import relatorioRouter from './relatorio.js';
// Usar outras rotas

router.use("/produtos", registroRouter);
router.use("/funcionarios", funcionariosRouter);
router.use("/relatorio",relatorioRouter);
router.use('/tarefas',tarefasRouter);
router.use("/manutencao", manutencaoRouter);

export default router;