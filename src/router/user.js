const {login} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resModel')

// 获取cookie过期时间
const getCookieExprires = () => {
    const d = new Date()
    d.setTime(d.getTime() + ( 32 * 60 * 60 * 1000))
    console.log(d.toUTCString())
    return d.toUTCString()
}

const handelUserRouter = (req, res) => {
    const method = req.method

    // 用户登录
    if (method === 'GET' && req.path === '/api/user/login') {
        // const {userName, passWord} = req.body
        const {userName, passWord} = req.query
        const result = login(userName, passWord)
        return result.then(data => {
            if (data.userName) {
                req.session.userName = data.userName
                req.session.realName = data.realName

                return new SuccessModel()
            }
            return new ErrorModel('登录失败')
        })
    }

    // 用户登录测试
    if (method === 'GET' && req.path === '/api/user/login-test') {
        if(req.session.userName) {
            return Promise.resolve(
                new SuccessModel({
                    session: req.session
                })
            )
        }
        return Promise.resolve(
            new ErrorModel('尚未登录！')
        )
    }
}

module.exports = handelUserRouter