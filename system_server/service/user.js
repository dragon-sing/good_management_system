const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { findUsers,findById,addUser,updateUser,deleteById } = require('../db/user.js')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors())
app.listen(9090,() => {
    console.log('服务启动');
})
let login = true
app.all('*',(req,res,next) => {
    if (!login) return res.json('未登录');
    next();
})

app.get('/user',(req,res) => {
    findUsers((result)=>{
        res.json(result);
    })
})

app.get('/user/:id',(req,res) => {
    findById(req.params.id,(result) => {
        res.json(result);
    })
})

app.delete('/user/:id',(req,res) => {
    deleteById(req.params.id,(result) => {
        res.json(result);
    })
})

app.put('/user/:id',(req,res) => {
    updateUser(req.params.id,req.query,(result) => {
        res.json(result);
    })
})



app.post('/user',(req,res) => {
    addUser(req.query, (result) => {
        res.json(result)
    })
})


