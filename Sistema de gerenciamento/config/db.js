import mysql2 from 'mysql2';

const conn = mysql2.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Opencreative6139261',
    database: 'prodsystem',
    port: 3307,
});

conn.connect((err) => {  // Aqui use 'conn' em vez de 'connection'
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
    } else {
        console.log('Conexão com MySQL estabelecida com sucesso!');
    }
});

export default conn;
