const mysql = require('mysql')

let pool = mysql.createPool({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'root',
    database: 'good_management_system'
})

module.exports = {
    pool
}
