const { pool } = require('../config/pool');
//配置价格
let updatePriceById = async(id,obj)=>{
    let ans;
    pool.getConnection((err,connection)=>{
         if(err) {
             console.log(err);
         } else {
             let sql = 'update product set price = ? where product_id = ?'
             connection.query(sql,[obj.price,id],(err,result)=>{
                 if(err) {
                    ans = err
                    console.log(ans);
                 } else {
                    connection.release()
                    connection.destroy()
                    ans = result;
                 }
             })
         }
     })
    return ans;
}
 
 module.exports = {
    updatePriceById
}