const { pool } = require('../config/pool');

let getOrder = (sql,callback)=>{
    pool.getConnection((err,connection)=>{
        if(err) {
            console.log(err);
        } else {
            connection.query(sql,(err,result)=>{
                if(err) {
                    console.log(err)
                } else {
                    callback(result)
                    connection.release()
                    connection.destroy()
                }
            })
        }
    })
}

let getOrderDetailById = (id,callback)=>{
    pool.getConnection((err,connection)=>{
        if(err) {
            console.log(err);
        } else {
            let sql = "select * from `order` where id = ?"
            connection.query(sql,[id],(err,result)=>{
                if(err) {
                    console.log(err)
                } else {
                    callback(result)
                    connection.release()
                    connection.destroy()
                }
            })
        }
    })
}

let deleteOrderById = (id,callback)=>{
    pool.getConnection((err,connection)=>{
        if(err) {
            console.log(err);
        } else {
            let sql = 'delete from `order` where id = ?'
            connection.query(sql,[id],(err,result)=>{
                if(err) {
                    console.log(err)
                } else {
                    callback(result)
                    connection.release()
                    connection.destroy()
                }
            })
        }
    })
}

module.exports = {
    getOrder,
    deleteOrderById,
    getOrderDetailById
}