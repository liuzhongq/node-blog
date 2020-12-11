const { exec } = require('../db/mysql')

const loginCheck = (userName, passWord) => {
    const sql = `select userName, realName from users where userName='${userName}' and passWord='${passWord}' `
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}
module.exports = {
    loginCheck
}