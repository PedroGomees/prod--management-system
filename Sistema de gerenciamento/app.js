const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const routes = require('./api/index.js');


app.use(express.static( "public"));

app.use(routes);
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 


const basePath = path.join(__dirname,"templates")

app.get("/",(req, res)=>{
    res.sendFile(`${basePath}/index.html`)
})


app.listen(port,()=>{
    console.log("Server rodando na porta 3000")
})