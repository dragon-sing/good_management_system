const { addSku, getSku, deleteSkuById,updateSkuById } = require('../db/sku')
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const sku = req.query;
    let sql = "select * from sku_stock where"
    for (let col in sku) {
        sql += ` ${col} = "${sku[col]}"`
    }
    if (Object.keys(sku).length === 0) {
        sql = "select * from sku_stock"
    }
    getSku(sql,(result) => {
        res.json({
            code: 200,
            data: result
        })
    })
})

router.post('/', (req, res) => {
    const sku = req.body;
    addSku(sku, (result) => {
        res.json({
            code: 200,
            data: {
                msg: '添加成功！'
            }
        })
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    deleteSkuById(id, (result) => {
        res.json({
            code: 200,
            data: {
                msg: '删除成功'
            }
        })
    })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    updateSkuById(id, req.body, (result) => {
        res.json({
            code: 200,
            data: {
                msg: '修改成功'
            }
        })
    })
})
module.exports = router;