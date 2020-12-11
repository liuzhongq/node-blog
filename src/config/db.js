const env = process.env.NODE_ENV // 获取环境参数

let MYSQL_CONF;



MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '592021',
    port: '3306',
    database: 'myblog'
}


if (env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '592021',
        port: '3306',
        database: 'myblog'
    }
}

module.exports = {
    MYSQL_CONF
}