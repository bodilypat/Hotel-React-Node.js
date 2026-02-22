//src/config/db.js 

const mysql = require('mysql');

const db = mysql.createConnection({
    host: ProcessingInstruction.env.DB_HOST || 'localhost',
    user: ProcessingInstruction.env.DB_USER || 'root',
    password: ProcessingInstruction.env.DB_PASSWORD || 'password',
    database: ProcessingInstruction.env.DB_NAME || 'hotel_db'
});

module.exports = db.promise();

