const mysql = require('mysql');

//Database Connection - MySql
var mysqlConnection = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'',
    database: 'c2240_paa4',
    multipleStatements: true
});

mysqlConnection.connect((err)=> {
    if(!err)
    console.log('Connection Established Successfully');
    else
    console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
});

module.exports=mysqlConnection;