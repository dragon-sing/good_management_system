const mysql = require('mysql')

let pool = mysql.createPool({
    // host:'172.19.0.2', 
    host: 'localhost', // 设置为自己的mysql_ip
    port:'3306',
    user:'root',
    password:'123456',
    database: 'good_management_system',
    connectionLimit: 10,
    acquireTimeout: 30000, //30 secs
})

module.exports = {
    pool
}
