const mysql = require('mysql2/promise');

async function connect(){
    try{
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'P4$$w0rd',
            database: 'users',
            port: 3306
        });
        console.log('Connection MYSQL successful!');
        return connection;

    }catch(error){
        console.error('Error to connection MYSQL:', error);
        throw error;
    }
}

module.exports = connect;