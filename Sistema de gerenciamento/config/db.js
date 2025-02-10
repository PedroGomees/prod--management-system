import mysql from 'mysql2'; // Use diretamente 'mysql2/promise'

const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Opencreative6139261',
    database: 'prodsystem',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 3307
}); // NÃO precisa de `.promise()` porque já estamos importando 'mysql2/promise'

export default conn;
