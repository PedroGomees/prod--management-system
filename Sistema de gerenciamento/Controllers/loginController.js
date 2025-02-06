import express from 'express';
import mysql from 'mysql2';
import bcrypt from 'bcryptjs';
import conn from '../config/db.js';


 const loginController = {
    login: async (req,res)=>{
        const {nome,senha} = req.body;
        const [results] = await conn.promise().query('SELECT * FROM admin WHERE nome = ?',[nome]);
        const user = results[0]
        if(!user){
            return res.status(403).json({message:"Usuario não existe"})
        }
     
        const senhaCorreta = await bcrypt.compare(senha, user.senha);
        if(!senhaCorreta){
            return res.status(403).json({message:"Senha incorreta"})
        }
        req.session.user = { id: user.id, nome: user.nome };
        console.log("Usuário logado:", req.session.user);
            // Redirecionar ou enviar resposta de sucesso
            return res.redirect('/')

}}

export default loginController