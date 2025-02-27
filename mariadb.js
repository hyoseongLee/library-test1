const mysql = require('mysql2');

const connection = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : 'root',
    timezone : 'Asia/Seoul',
    database : 'library',
    dateStrings : true
});

connection.query(
    'SELECT * FROM `books`',
    function(err, results, fields) {
        var arr = [1,2,3]
        var {id,email,name,create_at} = results[0];
        console.log(arr[0]);
        console.log(email);
        console.log(name)
        console.log(create_at)
    }
)

module.exports = connection;