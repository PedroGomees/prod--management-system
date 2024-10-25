import express from 'express';
import path from 'path';
import conn from '../config/db.js';
const router = express.Router();

// Rota para a página inicial
router.get("/", (req, res) => {
    res.render("home", { titulo: "Página Inicial" }); // Renderiza o template de home
});

// Importe suas outras rotas

import registroRouter from './produtos.js';
import funcionariosRouter from './funcionarios.js';
import homeRouter from './home.js';
// Usar outras rotas

router.use("/produtos", registroRouter);
router.use("/funcionarios", funcionariosRouter);


// Exporta o router
export default router;