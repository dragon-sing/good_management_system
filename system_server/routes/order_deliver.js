const express = require('express');
const { runSqlUtil } = require('../util/db.js')
const router = express.Router();


// 订单发货
router.put('/:id', (req, res) => {
    const order_sn= req.params.id
    const form_data = req.body
    sql = `update order_list set delivery_company = '${form_data.delivery_company}',
    delivery_sn=${form_data.delivery_sn} where order_sn = ${order_sn}`
    runSqlUtil(sql,(result) => {
      if (result === "error") {
        res.json({
          code: 402,
          data: {
            msg: '修改失败',
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