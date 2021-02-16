// 封装dao层
const { pool } = require('./pool');

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

// 新增用户或修改用户
let updateUser = (id,obj,callback)=>{
    pool.getConnection((err,connection)=>{
        if(err) {
            console.log(err);
        } else {
            // 修改
            let sql = 'update user set username=?,password=? where id=?'
            connection.query(sql,[obj.username,obj.password,id],(err,result)=>{
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

module.exports = {
    findUsers,
    findById,
    updateUser,
    addUser,
    deleteById
}
