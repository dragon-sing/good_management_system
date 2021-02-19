const { findUserByInfo } = require('../db/login')
const express = require('express');
const router = express.Router();

router.get('/login', (req,res) => {
  findUserByInfo(req.query,(result) => {
    if (result)
      // console.log(result[0].id);
      res.cookie('user_id',result[0].id,{maxAge: 60*60*1000})
    res.json({
      code: 200,
      data: result[0] || {}
    })
    
  })
})

module.exports = router;
