import express from 'express';
import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.render('home', { titulo: "Home" }); // Renderiza usando o layout
});

export default router;