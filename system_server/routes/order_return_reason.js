const { addReason, getReasons, deleteReasonById, updateReasonById } = require('../db/order_return_reason')
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    getReasons((result) => {
        res.json({
            code: 200,
            data: result
        })
    })
})

router.post('/', (req, res) => {
    const reason = req.body;
    addReason(reason, (result) => {
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
    deleteReasonById(id, (result) => {
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
    updateReasonById(id, req.body, (result) => {
        res.json({
            code: 200,
            data: {
                msg: '修改成功'
            }
        })
    })
})
module.exports = router;