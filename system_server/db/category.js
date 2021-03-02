const { pool } = require('../config/pool');

let addCategory = (obj,callback)=>{
    pool.getConnection((err,connection)=>{
        if(err) {
            console.log(err);
        } else {
            let sql = 'insert into category(cat_name,created_time,comment) values(?,?,?)'
            connection.query(sql,[obj.cat_name,obj.created_time,obj.comment],(err,result)=>{
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

let getCategory = (callback)=>{
    pool.getConnection((err,connection)=>{
        if(err) {
            console.log(err);
        } else {
            let sql = 'select * from category'
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

let deleteCategoryById = (id,callback)=>{
    pool.getConnection((err,connection)=>{
        if(err) {
            console.log(err);
        } else {
            let sql = 'delete from category where cat_id = ?'
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

let updateCategoryById = (id,obj,callback)=>{
  pool.getConnection((err,connection)=>{
      if(err) {
          console.log(err);
      } else {
          let sql = 'update category set cat_name = ? , comment = ? where cat_id = ?'
          connection.query(sql,[obj.cat_name,obj.comment,id],(err,result)=>{
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
    addCategory,
    getCategory,
    deleteCategoryById,
    updateCategoryById
}