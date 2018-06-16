var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'sql12.freemysqlhosting.net',
  user: 'sql12243197',
  password: '8YcqWUyKmf',
  database : 'sql12243197',
  port : process.env.DB_PORT
})


connection.connect()

module.exports = connection;