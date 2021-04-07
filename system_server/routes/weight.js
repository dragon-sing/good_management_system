const { addWeight, getWeight, deleteWeightById, updateWeightById } = require('../db/weight')
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const weight = req.query;
    let sql = "select * from product_weight where"
    let flag = false
    for (let col in weight) {
        if (weight[col]) {
            sql += ` ${col} = "${weight[col]}" and`;
            flag = true;
        }
    }
    if (flag) {
        let len = sql.length;
        sql = sql.substring(0, len - 3);
    }
    if (!flag) {
        sql = "select * from product_weight"
    }
    getWeight(sql, (result) => {
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