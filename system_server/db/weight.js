const { pool } = require('../config/pool');

let addWeight = (obj,callback)=>{
    pool.getConnection((err,connection)=>{
        if(err) {
            console.log(err);
        } else {
            let sql = 'insert into product_weight(product_id,weight) values(?,?)'
            connection.query(sql,[obj.product_id,obj.weight],(err,result)=>{
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

let getWeight = (sql,callback)=>{
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

let deleteWeightById = (id,callback)=>{
    pool.getConnection((err,connection)=>{
        if(err) {
            console.log(err);
        } else {
            let sql = 'delete from product_weight where id = ?'
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

let updateWeightById = (id,obj,callback)=>{
  pool.getConnection((err,connection)=>{
      if(err) {
          console.log(err);
      } else {
          let sql = 'update product_weight set weight = ?  where id = ?'
          connection.query(sql,[obj.weight,id],(err,result)=>{
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
    addWeight,
    getWeight,
    deleteWeightById,
    updateWeightById
}