const express = require('express');
const bodyParser = require('body-parser');
// cookie设置
const cookieParser = require('cookie-parser')
// 解决跨域
const cors = require('cors');
const app = express();
const router = express.Router();
// 使用中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors())
app.use(cookieParser())
//引入路径
let loginRouter=require('./routes/login');
let userRouter=require('./routes/user');
let categoryRouter=require('./routes/category');
let goodRouter=require('./routes/good');
let weightRouter=require('./routes/weight');
let skuRouter=require('./routes/sku');
let orderRouter=require('./routes/order');
let orderReturnReasonRouter=require('./routes/order_return_reason');
let visitRouter=require('./routes/visit');
let priceRouter=require('./routes/price');
let orderSettingRouter=require('./routes/order_setting');
let orderDeliver=require('./routes/order_deliver');
let orderItem= require('./routes/order_item');
let orderOperate= require('./routes/order_operate');
app.use('/api/',loginRouter)
app.use('/api/user',userRouter)
app.use('/api/category',categoryRouter)
app.use('/api/good',goodRouter)
app.use('/api/weight',weightRouter)
app.use('/api/sku',skuRouter)
app.use('/api/order',orderRouter)
app.use('/api/order_return_reason',orderReturnReasonRouter)
app.use('/api/visit',visitRouter)
app.use('/api/price',priceRouter)
app.use('/api/order_setting',orderSettingRouter)
app.use('/api/order_deliver',orderDeliver)
app.use('/api/order_item',orderItem)
app.use('/api/order_operate',orderOperate)
// 开启服务
app.listen(9090,() => {
  console.log('服务启动');
})