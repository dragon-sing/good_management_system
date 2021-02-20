// 封装dao层
const { pool } = require('../config/pool');

// 查询所有的用户
let findUsers = (callback)=>{
    pool.getConnection((err,connection)=>{
        if(err) {
            console.log(err);
        } else {
            let sql = 'select * from user'
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

// 根据id查询用户信息
let findById = (id,callback)=>{
    pool.getConnection((err,connection)=>{
        if(err) {
            console.log(err);
        } else {
            let sql = 'select * from user where id=?'
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

// 修改密码
let updateUser = (obj,token,callback)=>{
    pool.getConnection((err,connection)=>{
        if(err) {
            console.log(err);
        } else {
            // 修改
            let sql = 'update user set password=? WHERE id = (SELECT id FROM `Authority` WHERE token = ?)'
            connection.query(sql,[obj.new_password,token],(err,result)=>{
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


let addUser = (obj,callback) => {
    pool.getConnection((err,connection)=>{
        if(err) {
            console.log(err);
        } else {
            // 保存
            let sql = 'insert into user(id,username,password) values(?,?,?)'
            connection.query(sql,[null,obj.username,obj.password],(err,result)=>{
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


// 根据id删除用户
let deleteById = (id,callback)=>{
    pool.getConnection((err,connection)=>{
        if(err) {
            console.log(err);
        } else {
            let sql = 'delete from user where id = ?'
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

// 根据token查询user
let getUserByToken = (token,callback)=>{
  pool.getConnection((err,connection)=>{
      if(err) {
          console.log(err);
      } else {
          let sql = 'SELECT * from `USER` WHERE id = (SELECT id FROM `Authority` WHERE token = ?)'
          connection.query(sql,[token],(err,result)=>{
              if(err) {
                  console.log(err)
              } else {
                  callback(result[0])
                  connection.release()
                  connection.destroy()
              }
          })
      }
  })
}

module.exports = {
    findUsers,
    findById,
    updateUser,
    addUser,
    deleteById,
    getUserByToken
}
