const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'nodejs',
  password: 'Park037049!!',
  database: 'board',
});

conn.connect((err) => {
  if (err) console.log(err);
  else console.log('Connect');
});

module.exports = conn;
