const { addGood,getGoods,deleteGoodById,updateGoodById} = require('../db/good')
const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
  const product = req.query;
  let sql = "select * from product where"
  let flag = false
  for (let col in product) {
    if (product[col]) {
      sql += ` ${col} = "${product[col]}" and` ;  
      flag = true;
    }
  }
  if (flag) {
    let len = sql.length;
    sql = sql.substring(0,len-3);
  }
  if (!flag) {
    sql = "select * from product"
  }
  console.log(sql)
  getGoods(sql,(result) => {
        res.json({
        code: 200,
        data: result
    })
  })
})
  
router.post('/', (req,res) => {
  const product = req.body;
  let date = new Date();
  product.created_time = date.toLocaleDateString();
  product.is_delete = 0;
  addGood(product,(result) => {
    res.json({
      code: 200,
      data: {
        msg: '添加成功！'
      }
    })
  })
})  

router.delete('/:id',(req,res) => {
  const id = req.params.id
  deleteGoodById(id,(result) => {
    res.json({
      code: 200,
      data: {
        msg: '删除成功'
      }
    })
  })
})

router.post('/:id',(req,res) => {
  const id = req.params.id
  updateGoodById(id,req.body,(result) => {
    res.json({
      code: 200,
      data: {
        msg: '修改成功'
      }
    })
  })
})

router.post('/:id',(req,res) =>{
  const id = req.params.id
  updatePriceById(id,req.body,(result) => {
    res.json({
      code: 200,
      data: {
        msg: '修改成功'
      }
    })
  })
})

module.exports = router;