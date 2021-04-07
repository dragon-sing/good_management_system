const { updateUser,getUserByToken } = require('../db/user.js')
const express = require('express');
const router = express.Router();

router.get('/info',(req,res) => {
  const token = req.headers['x-token']
  getUserByToken(token,(result) => {
    const roles = []
    if (result) {
      if (result.is_admin === 1) {
        roles.push('admin');
      }
    }
    res.json({
      code: 200,
      data: {
        ...result,
        roles
      }
    })
  })
})

router.post('/logout',(req,res) => {
  res.json({
    code: 200,
    msg: '退出成功！'
  })
})

router.post('/password', (req,res) => {
  const token = req.headers['x-token']
  getUserByToken(token,(result) => {
    const password = result.password
    if (password != req.body.old_password) {
      res.json({
        code: 100,
        msg: '原密码错误!'
      })
      return;
    }
    updateUser(req.body,token,(result) => {
      res.json({
        code: 200,
        msg: '更新成功!'
      })
    })

  })
})

module.exports = router;