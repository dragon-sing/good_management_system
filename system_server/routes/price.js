const { runSqlUtil } = require('../util/db.js')
const express = require('express');
const router = express.Router();

router.post('/:id',async(req,res) =>{
    sql = `
      update product set price = ${req.body.price}  where product_id = ${req.params.id}
    `;
    runSqlUtil(sql,(result) => {
      if (result === "error") {
        res.json({
          code: 402,
          data: {
            msg: '修改错误',
          }
        })
        return ;
      }
      res.json({
        code: 200,
        data: {
          msg: '修改成功',
        }
      })
    });
    
  })
  
  module.exports = router;