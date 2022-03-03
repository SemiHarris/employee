const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      
      user: 'root',
      
      password: 'Khyaire1_Master',
      database: 'work'
    },
    console.log('Connected to the work database.')
  );

module.exports = db;
