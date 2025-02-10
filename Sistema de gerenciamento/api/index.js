import express from 'express';
import path from 'path';
import conn from '../config/db.js';
const router = express.Router();
import authMiddleware from '../Controllers/middlewares.js';
// Rota para a página inicial
router.get("/", authMiddleware, (req, res) => {
    res.render("home", { titulo: "Página Inicial" }); // Renderiza o template de home
});

// Importando rotas

import manutencaoRouter from './manutencao.js';
import tarefasRouter from './tarefas.js';
import registroRouter from './produtos.js';
import funcionariosRouter from './funcionarios.js';
import homeRouter from './home.js';
import relatorioRouter from './relatorio.js';
import adminRouter from "./admin.js"
import loginRouter from "./login.js"

// Usar outras rotas

router.use("/produtos", registroRouter);
router.use("/funcionarios",authMiddleware, funcionariosRouter);
router.use("/relatorio",authMiddleware,relatorioRouter);
router.use('/tarefas',authMiddleware,tarefasRouter);
router.use("/manutencao",authMiddleware, manutencaoRouter);
router.use("/admin",authMiddleware, adminRouter);
router.use("/login",loginRouter);
export default router;