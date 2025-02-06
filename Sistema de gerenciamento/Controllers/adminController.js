import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2'; 
import bcrypt from 'bcryptjs'
import conn from '../config/db.js';


const adminController = {
    register: async (req,res)=>{
        const {nome,senha,senhaConfirmada} = req.body;
if(senha !== senhaConfirmada){
  return  res.status(400).json({message:"As senhas são diferentes"})
}
try{
    const hashedSenha = await bcrypt.hash(senha,8);
    await conn.promise().query('INSERT INTO admin (nome, senha) VALUES (?, ?)',[nome,hashedSenha]);
    console.log("Adm add com sucesso");
    return res.redirect("/login");
}
    
catch(error){
    return console.error("Erro ao registrar administrador:")
}
    }
}

export default adminController