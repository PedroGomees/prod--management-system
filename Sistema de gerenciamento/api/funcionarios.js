const express = require('express')
const router = express.Router()
const app = express()
const path = require('path')
const fs = require('fs');
const registro = []
const basePath = path.join(__dirname, '../templates')
const filePath = path.join(__dirname, '../funcionarios.json');
router.use(express.urlencoded({ extended: true }));
router.use(express.json());


router.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/cadastrar-funcionarios.html'));
});

router.post('/save', (req, res) => {
   const name = req.body.name;

    if (!name) {
        return res.status(400).send("O nome do funcionário é obrigatório.");
    }

    fs.readFile(filePath,'utf-8',(err,data)=>{
        let funcionarios = [];

        if(!err && data){
            funcionarios = JSON.parse(data)
        }
        funcionarios.push({name});

        fs.writeFile(filePath, JSON.stringify(funcionarios,null,2),(err)=>{
            if(err){
                return res.status(500).send("Erro ao salvar funcionário")
            }
            res.redirect('/funcionarios/lista');
        })
    })

});
router.get('/lista',(req,res)=>{
    res.sendFile(`${basePath}/lista.html`)
})
module.exports = router;