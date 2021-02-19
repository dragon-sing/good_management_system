const { updateUser } = require('../db/user.js')
const express = require('express');
const cookieParser = require('cookie-parser')
const app = express()
app.use(cookieParser())
const router = express.Router();


router.put('/user',(req,res) => {
  // console.log('Cookies: ', !req.cookies.user_id)
  if (!req.cookies.user_id) {
    res.json({
      code: 100,
      msg: '用户未登录'
    })
    return 
  }
  const id = req.cookies.user_id
  updateUser(id,req.query,(result) => {
      res.json({
        code: 200,
        data: {}
      });
  })
})

module.exports = router;