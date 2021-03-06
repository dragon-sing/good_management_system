const { getOrder, deleteOrderById, getOrderDetailById } = require('../db/order')
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const order = req.params
  let sql = "select * from order where"
  let flag = false
  for (let col in order) {
    if (order[col]) {
      sql += ` ${col} = "${order[col]}" and`;
      flag = true;
    }
  }
  if (flag) {
    let len = sql.length;
    sql = sql.substring(0, len - 3);
  }
  if (Object.keys(order).length === 0) {
    sql = "select * from order"
  }
  getOrder((result) => {
    res.json({
      code: 200,
      data: result
    })
  })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  deleteOrderById(id, (result) => {
    res.json({
      code: 200,
      data: {
        msg: '删除成功'
      }
    })
  })
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