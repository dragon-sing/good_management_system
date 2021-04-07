const { pool } = require('../config/pool');

let addSku = (obj,callback)=>{
    pool.getConnection((err,connection)=>{
        if(err) {
            console.log(err);
        } else {
            let sql = 'insert into sku_stock(product_id,sku_code,stock,low_stock) values(?,?,?,?)'
            connection.query(sql,[obj.product_id,obj.sku_code,obj.stock,obj.low_stock],(err,result)=>{
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

let getSku = (sql,callback)=>{
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

let deleteSkuById = (id,callback)=>{
    pool.getConnection((err,connection)=>{
        if(err) {
            console.log(err);
        } else {
            let sql = 'delete from sku_stock where id = ?'
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

let updateSkuById = (id,obj,callback)=>{
  pool.getConnection((err,connection)=>{
      if(err) {
          console.log(err);
      } else {
          let sql = 'update sku_stock set stock = ? ,low_stock = ? where product_id = ?'
          connection.query(sql,[obj.stock,obj.low_stock,id],(err,result)=>{
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
    addSku,
    getSku,
    deleteSkuById,
    updateSkuById
}