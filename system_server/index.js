const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

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

app.get('/',(req,res) => {
    res.json('1hello world');
})

app.post('/login',(req,res) => {
    res.json('hello');
})

app.post('/test/:data',(req,res) => {
    return res.json({query: req.query,data: req.params,json: req.body})
})