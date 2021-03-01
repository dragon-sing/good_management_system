const { addCategory,getCategory,deleteCategoryById } = require('../db/category')
const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
  getCategory((result) => {
    res.json({
      code: 200,
      data: result
    })
  })
})
  
router.post('/', (req,res) => {
  const category = req.body;
  console.log(category)
  let date = new Date();
  category.created_time = date.toLocaleDateString();
  addCategory(category,(result) => {
    res.json({
      code: 200,
      data: {
        msg: '添加成功！'
      }
    })
  })
})  

router.delete('/:cat_id',(req,res) => {
  const cat_id = req.params.cat_id
  deleteCategoryById(cat_id,(result) => {
    res.json({
      code: 200,
      data: {
        msg: '删除成功'
      }
    })
  })
})


module.exports = router;