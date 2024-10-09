import express from 'express';
import path from 'path';

const router = express.Router();

// Rota para a página inicial
router.get("/", (req, res) => {
    res.render("home", { titulo: "Página Inicial" }); // Renderiza o template de home
});

// Importe suas outras rotas
import producaoRouter from './producao.js';
import registroRouter from './registro.js';
import funcionariosRouter from './funcionarios.js';
import homeRouter from './home.js';
// Usar outras rotas
router.use("/producao", producaoRouter);
router.use("/registro", registroRouter);
router.use("/funcionarios", funcionariosRouter);
router.use("/funcionarios", funcionariosRouter);

// Exporta o router
export default router;