const express = require('express')
const router = express.Router()
const app = express()
const fs = require('fs');
const path = require('path')
const registro = []
const basePath = path.join(__dirname, '../templates')

app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

router.get(`/`,(req,res)=>{
   res.sendFile(`${basePath}/registro.html`)
})

router.post("/save", (req, res) => {
    const { product, date, name } = req.body;
    
    if (!product || !name || !date) {
        return res.status(400).send("Todos os campos são obrigatórios.");
    }
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send("Erro ao verificar funcionários.");
        }

        const funcionarios = data.split('\n').filter(Boolean); // Divide os funcionários por linha
        if (!funcionarios.includes(funcionario)) {
            return res.status(400).send("Funcionário não encontrado.");
        }

        // Se o funcionário existe, salvar o produto (a lógica de salvar vai aqui)
        res.send("Produto cadastrado com sucesso!");
    });
    registro.push({ product, name, date });
    res.send(registro);
});

module.exports = router
