const jwt=require('jsonwebtoken');

const express = require("express");
const { createTodo, getAllTodos } = require('../controller/TodoController');
const todoroutes = express.Router();

const verifyToken=(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({message:"Unauthorized"});
        }
        const decoded=jwt.verify(token,process.env.SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("Token verification failed",error);
        res.status(401).json({message:"Unauthorized"});
    }
}



todoroutes.post("/todo", verifyToken, createTodo);
todoroutes.get("/todo", verifyToken, getAllTodos);

// routes.post("/auth/login", Login);

module.exports = todoroutes;
