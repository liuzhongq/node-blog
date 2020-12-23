const env = process.env.NODE_ENV // 获取环境参数

let MYSQL_CONF;
let REDIS_CONF;

// 本地开发环境

    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '592021',
        port: '3306',
        database: 'myblog'
    }

//redis

    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }


// 生产环境
if (env === 'production') {
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '592021',
        port: '3306',
        database: 'myblog'
    }
    // redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}