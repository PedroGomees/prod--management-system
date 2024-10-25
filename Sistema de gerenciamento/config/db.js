import mysql from 'mysql';

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sanduba222',
    database: 'prodsystem',
});


export default conn;
