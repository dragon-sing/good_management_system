// 封装dao层
const { pool } = require('../config/pool');


let findUserByInfo = (obj,callback)=>{
  pool.getConnection((err,connection)=>{
      if(err) {
          console.log(err);
      } else {
          let sql = 'select * from user where username = ? and password = ? '
          connection.query(sql,[obj.username,obj.password],(err,result)=>{
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

let getUserTokenByInfo = (obj,callback) => {
  pool.getConnection((err,connection)=>{
    if(err) {
        console.log(err);
    } else {
        let sql = 'SELECT * from `authority` WHERE id = (SELECT id FROM `USER` WHERE username = ? and password = ?)'
        connection.query(sql,[obj.username,obj.password],(err,result)=>{
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
  findUserByInfo,
  getUserTokenByInfo
}