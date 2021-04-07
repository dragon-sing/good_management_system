const express = require('express');
const router = express.Router();
const { runSqlUtil } = require('../util/db.js')

router.get('/', (req, res) => {
  const order_sn = req.query.order_sn
  let sql = `select * from order_item where order_sn =${order_sn}`

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