const express = require('express')
const router = express.Router()
const app = express()
const path = require('path')
const fs = require('fs');
const registro = []
const basePath = path.join(__dirname, '../templates')
const filePath = path.join(__dirname, 'funcionarios.txt');


router.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/cadastrar-funcionarios.html'));
});
app.use(express.urlencoded({ extended: true })); 
app.use(express.json())
router.post('/save', (req, res) => {
    const name  = req.body.name;

    if (!name) {
        return res.status(400).send("O nome do funcionário é obrigatório.");
    }


   
    fs.appendFile(filePath, `${name}\n`, (err) => {
        if (err) {
            return res.status(500).send("Erro ao salvar o funcionário.");
        }
        res.send("Funcionário cadastrado com sucesso!");
    });
});
router.get('/lista',(req,res)=>{
    res.sendFile(`${basePath}/lista.html`)
})
module.exports = router;