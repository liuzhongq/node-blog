const { exec } = require('../db/mysql')
const xss = require('xss')

const getList = (author, keyword) => {
   let sql = `select * from blogs where 1=1 `
    if(author) {
       sql += `and author='${author}'`
    }
    if(keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createTime desc;`
    // 返回 promise
    return exec(sql)
}
const getDetail = (id) => {
    let sql = `select * from blogs where id='${id}'`
    return exec(sql).then(row => {
        return row[0]
    })
}

const newBlog = (blogData = {}) => {
    const title = xss(blogData.title)
    const content = blogData.content
    const author = blogData.author
    const createTime = Date.now()

    let sql = `insert into blogs(title,content,author,createTime)values('${title}','${content}','${author}',${createTime});`
    return exec(sql).then(insertData => {
        // console.log(insertData)
        return {
            id: insertData.insertId
        }
    })

}

const updateBlog = (id, blogData = {}) => {
    const title = blogData.title
    const content = blogData.content
    let sql = `update blogs set title='${title}', content='${content}' where id=${id}`
    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}
const deleteBlog = (id, author) => {
    let sql = `delete from blogs where id='${id}' and author='${author}' `
    return exec(sql).then(deleteData => {
        if (deleteData.affectedRows > 0) {
            return true
        }
        return false
    })
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}