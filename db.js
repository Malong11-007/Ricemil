var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'sql12.freemysqlhosting.net',
  user: 'sql12243197',
  password: '8YcqWUyKmf',
  database : 'sql12243197',
  port : process.env.DB_PORT
})
// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database : 'ricemill',
//   port : 3306
// })


connection.connect()

module.exports = connection;