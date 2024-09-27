const express = require('express')
const router = express.Router()
const app = express()
const fs = require('fs');
const path = require('path')
const basePath = path.join(__dirname, '../templates')

router.get("/",(req,res)=>{
    res.sendFile(`${basePath}/producao.html`)
})



module.exports = router
