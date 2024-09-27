const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const router = express.Router()
const producaoRouter = require('./producao')

router.get("/",(req, res)=>{
    res.sendFile(`${basePath}/index.html`)
})

const basePath = path.join(__dirname,"../templates")
const registroRouter = require('./registro')
const funcionariosRouter = require('./funcionarios')

router.use("/producao", producaoRouter)
router.use("/registro", registroRouter);
router.use("/funcionarios", funcionariosRouter);
module.exports = router


