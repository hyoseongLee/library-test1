const mariadb = require('mysql2');

const conn = mariadb.createConnection({
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'library',
        dateStrings : true
});

module.exports = conn;