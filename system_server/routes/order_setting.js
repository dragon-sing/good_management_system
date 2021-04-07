const express = require('express');
const { runSqlUtil } = require('../util/db.js')
const router = express.Router();

// 查询订单设置
router.get('/', async(req, res) => {
    sql = "select * from order_setting";
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


// 更新订单设置
router.put('/:id', (req, res) => {
    const id = req.params.id
    const reason = req.body
    sql = `update order_setting set flash_order_overtime = '${reason.flash_order_overtime}',
    normal_order_overtime=${reason.normal_order_overtime},
    confirm_overtime=${reason.confirm_overtime},
    finish_overtime=${reason.finish_overtime},
    comment_overtime=${reason.comment_overtime} where id = ${id}`
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