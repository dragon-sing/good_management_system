const express = require('express');
const bodyParser = require('body-parser');
// cookie设置
const cookieParser = require('cookie-parser')
// 解决跨域
const cors = require('cors');
const app = express();
const router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors())
app.use(cookieParser())
//引入路径
let loginRouter=require('./routes/login');
let userRouter=require('./routes/user');

app.use('/api/',loginRouter)
app.use('/api/user',userRouter)


// 开启服务
app.listen(9090,() => {
  console.log('服务启动');
})