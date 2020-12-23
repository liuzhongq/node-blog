const { getList,getDetail,newBlog,updateBlog,deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 统一的登录验证函数
const loginCheck = (req) => {
    if(!req.session.userName) {
        return Promise.resolve(
            new ErrorModel('尚未登录')
        )
    }
}

const handleBlogRouter = (req, res) => {
    const method = req.method
    const id = req.query.id

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // const listData = getList(author, keyword)
        // return new SuccessModel(listData, '博客列表获取成功！')
        const result = getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData, '博客列表获取成功！')
        })
    }
    // 获取博客内容
    if (method === 'GET' && req.path === '/api/blog/detail') {
        // const detail = getDetail(id)
        // return new SuccessModel(detail, '博客内容获取成功！')
        const result = getDetail(id)
        return result.then(detailData => {
            return new SuccessModel(detailData, '博客详情获取成功！')
        })
    }
    // 新增博客
    if (method === 'POST' && req.path === '/api/blog/new') {

        const loginCheckResult = loginCheck(req)
        if(loginCheckResult) {
            // 未登录
            return loginCheck
        }

        req.body.author = req.session.userName
        const result = newBlog(req.body)
        return result.then(newData => {
            return new SuccessModel(newData, '博客新增成功！')
        })
    }
    // 更新博客
    if (method === 'POST' && req.path === '/api/blog/update') {

        const loginCheckResult = loginCheck(req)
        if(loginCheckResult) {
            // 未登录
            return loginCheck
        }

        const result = updateBlog(id, req.body)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('更新失败')
            }
        })
    }
    // 删除博客
    if (method === 'POST' && req.path === '/api/blog/delete') {

        const loginCheckResult = loginCheck(req)
        if(loginCheckResult) {
            // 未登录
            return loginCheck
        }

        req.body.author = req.session.userName
        const result = deleteBlog(id, req.body.author)
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            } else {
                return new ErrorModel('删除失败')
            }
        })
    }
}
module.exports = handleBlogRouter