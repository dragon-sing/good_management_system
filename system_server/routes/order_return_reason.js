const express = require('express');
const { runSqlUtil } = require('../util/db.js')
const router = express.Router();

// 查询退货原因
router.get('/', async(req, res) => {
    sql = "select * from order_return_reason";
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

// 添加退货原因
router.post('/', (req, res) => {
    const reason = req.body;
    let date = new Date();
    reason.created_time = date.toLocaleDateString();
    sql= `
      insert into order_return_reason(name,sort,status,created_time) values('${reason.name}',${reason.sort},${reason.status},'${reason.created_time}')
    `;
    runSqlUtil(sql,(result) => {
        if (result === "error") {
          res.json({
            code: 402,
            data: {
              msg: '添加失败',
            }
          })
          return ;
        }
        res.json({
            code: 200,
            data: {
              msg: '添加成功',
            }
          })
      });
})

// 删除退货原因
router.delete('/:id', (req, res) => {
    sql = `delete from order_return_reason where id = ${req.params.id}`
    runSqlUtil(sql,(result) => {
      if (result === "error") {
        res.json({
          code: 402,
          data: {
            msg: '删除失败',
          }
        })
        return ;
      }
      res.json({
          code: 200,
          data: {
            msg: '删除成功',
          }
        })
    });
})

// 更新退货原因
router.put('/:id', (req, res) => {
    const id = req.params.id
    const reason = req.body
    sql = `update order_return_reason set name = '${reason.name}',sort=${reason.sort},status=${reason.status} where id = ${id}`
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