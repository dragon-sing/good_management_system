const express = require('express');
const router = express.Router();
const { runSqlUtil } = require('../util/db.js')

router.get('/', (req, res) => {
  const order_id = req.query.order_id
  let sql = `select * from order_operate_history where order_id =${order_id}`
 
  runSqlUtil(sql,(result) => {
    if (result === "error") {
      res.json({
        code: 402,
        data: {
          msg: '查询失败',
        }
      })
      return ;
    }
    res.json({
      code: 200,
      data: result
    })
  });
})
module.exports = router;