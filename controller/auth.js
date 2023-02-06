const express = require('express');
const connect = require('../db/db')
const bcrypt = require('bcrypt');


const register = (req, res)=>{

    let {name, email, password} = req.body
   let sql = `INSERT INTO register_tb(name,email,password) VALUES (?,?,?)`;
   connect.query(sql,[name, email, password], (err, result)=>{
       if (err){
           throw err
       }else{
           if(result){
               res.status(200).json({
                   message:"registered successful",
                   data:result
                })

           }else{
               res.status(500).send(
                   err
                );
           }
       }
   })
}

const login = async (req, res) => {
   let {email, password} = req.body
   console.log(email, password)
   let sql = `SELECT email, password FROM registration_tb WHERE email = ? AND password = ?`;
     await connect.query(sql, [email, password], (err, row) => {
                console.log(row);
            if(row ){
                res.status(200).json({
                    message: 'registered successfully'
                })
            }else{
                res.status(500).send(
                    err
                 );
            }
        })
        
}

const justTest = (req,res)=>{
    res.json({msg:"joshua is here"})
}

module.exports = {register, login, justTest};

