const {loginCheck} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resModel')

const handelUserRouter = (req, res) => {
    const method = req.method

    // 用户登录
    if (method === 'POST' && req.path === '/api/user/login') {
        const {userName, passWord} = req.body
        const result = loginCheck(userName, passWord)
        return result.then(data => {
            console.log(data)
            if (data.userName) {
                return new SuccessModel()
            }
            return new ErrorModel('登录失败')
        })
    }
}

module.exports = handelUserRouter