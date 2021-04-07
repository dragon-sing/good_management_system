const { pool } = require('../config/pool');

let addGood = (obj,callback)=>{
    pool.getConnection((err,connection)=>{
        if(err) {
            console.log(err);
        } else {
            let sql = 'insert into product(product_id,product_name,cat_id,url,price,is_delete,created_time,description) values(?,?,?,?,0,?,?)'
            connection.query(sql,
                [obj.product_id,obj.product_name,obj.cat_id,obj.url,obj.price,obj.created_time,obj.description ],
                (err,result)=>{
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

let getGoods = (sql,callback)=>{
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

let deleteGoodById = (id,callback)=>{
    pool.getConnection((err,connection)=>{
        if(err) {
            console.log(err);
        } else {
            let sql = 'update product set is_delete = 1 where id = ?'
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

let updateGoodById = (id,obj,callback)=>{
    pool.getConnection((err,connection)=>{
        if(err) {
            console.log(err);
        } else {
            let sql = 'update product set product_name = ? ,cat_id = ?,url = ?,description = ? where product_id = ?'
            connection.query(sql,[obj.product_name,obj.cat_id,obj.url,obj.description,id],(err,result)=>{
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
    addGood,
    getGoods,
    deleteGoodById,
    updateGoodById
}