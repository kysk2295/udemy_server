const mysql = require('mysql2/promise');
const {logger} = require('./winston');

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
    host: 'database-1.cujnkyddd6wb.ap-northeast-2.rds.amazonaws.com',
    user: 'admin',
    port: '3306',
    password: 'kysk9241',
    database: 'kysDB'
});

module.exports = {
    pool: pool
};