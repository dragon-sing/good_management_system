const { addGood,getGoods,deleteGoodById } = require('../db/good')
const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    getGoods((result) => {
        res.json({
        code: 200,
        data: result
    })
  })
})
  
router.post('/', (req,res) => {
  const good = req.body;
  let date = new Date();
  good.created_time = date.toLocaleDateString();
  good.is_delete = 0;
  good.url = ''
  addGood(category,(result) => {
    res.json({
      code: 200,
      data: {
        msg: '添加成功！'
      }
    })
  })
})  

router.delete('/:good_id',(req,res) => {
  const good_id = req.params.good_id
  deleteGoodById(good_id,(result) => {
    res.json({
      code: 200,
      data: {
        msg: '删除成功'
      }
    })
  })
})


module.exports = router;