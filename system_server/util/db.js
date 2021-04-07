const { pool } = require('../config/pool');
let runSqlUtil = (sql,cb) => {
    
    pool.getConnection((err,connection)=>{
        if(err) {
            console.log(err);
        } else {
            connection.query(sql,(err,result)=>{
                if(err) {
                   console.log(err);
                   cb("error");
                } else {
                   connection.release()
                   connection.destroy()
                   cb(result)
                }
            })
        }
    })
    
}

module.exports = {runSqlUtil}