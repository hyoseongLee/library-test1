const mysql = require('mysql2');

const conn = mariadb.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    timezone : 'Asia/Seoul',
    database : 'library',
    dateStrings : true
});

module.exports = conn;