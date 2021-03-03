const { addWeight, getWeight, deleteWeightById, updateWeightById } = require('../db/weight')
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const weight = req.query;
    let sql = "select * from weight where"
    for (let col in weight) {
        sql += ` ${col} = "${weight[col]}"`
    }
    if (Object.keys(weight).length === 0) {
        sql = "select * from weight"
    }
    getWeight(sql,(result) => {
        res.json({
            code: 200,
            data: result
        })
    })
})

router.post('/', (req, res) => {
    const weight = req.body;
    addWeight(weight, (result) => {
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
    deleteWeightById(id, (result) => {
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
    updateWeightById(id, req.body, (result) => {
        res.json({
            code: 200,
            data: {
                msg: '修改成功'
            }
        })
    })
})
module.exports = router;