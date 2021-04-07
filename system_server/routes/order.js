const express = require('express');
const router = express.Router();
const { runSqlUtil } = require('../util/db.js')

router.get('/', (req, res) => {
  const order = req.query
  // let sql = "select * from order_list where"
  // let flag = false
  // for (let col in order) {
  //   if (order[col]) {
  //     sql += ` ${col} = "${order[col]}" and`;
  //     flag = true;
  //   }
  // }
  // if (flag) {
  //   let len = sql.length;
  //   sql = sql.substring(0, len - 3);
  // }
  // if (!flag) {
  //   sql = "select * from order_list where order_sn = *"
  // }
  let sql = "select *from order_list where"
  for (let col in order ){
    if (order[col]) {
      sql += ` ${col} = "${order[col]}" and`;
    } else {
      sql += ` ${col} LIKE "%" and`;
    }
  }
  let len = sql.length;
  if(sql.substring(len - 3,len) === "and"){
    sql = sql.substring(0,len - 3);
  }
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


// 删除订单
router.delete('/:id', (req, res) => {
    sql = `delete from order_list where id = ${req.params.id}`
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

router.get('/:id', (req, res) => {
  const id = req.params.id
  getOrderDetailById(id, (result) => {
    res.json({
      code: 200,
      data: result
    })
  })
})


module.exports = router;