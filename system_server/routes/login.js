const { findUserByInfo,getUserTokenByInfo } = require('../db/login')
const express = require('express');
const router = express.Router();

router.route('/login').options((req,res,next) => {
  res.json({
    code:200
  })
}).post((req,res) => {
  getUserTokenByInfo(req.body,(result) => {
    let token 
    if (result[0]) {
      token = result[0].token
    } 
    if (token) {
      res.json({
        code: 200,
        msg:'登陆成功！',
        data: {
          token
        }
      })
    } else {
      res.json({
        code: 401,
        msg: '用户名或密码错误!'
      })
    }
  })
})


module.exports = router;
