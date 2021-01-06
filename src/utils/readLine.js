// 逐行分析日志，根据是否用谷歌浏览器访问，记录用谷歌浏览器的访问占比

const fs = require('fs')
const path = require('path')
const readline = require('readline')

// 获取文件名
const fileName = path.resolve(__dirname, '../', '../', 'logs', 'access.log')

// 创建 read stream
const readStream = fs.createReadStream(fileName)

// 创建 readline 对象
const rl = readline.createInterface({
    input: readStream
})

let chromeNum = 0 // 浏览chrome的数量
let sum = 0 // 浏览总数量

// 逐行读取
rl.on('line', (lineData) => {
    if (!lineData) {
        return
    }

    // 记录总行数
    sum++

    const arr = lineData.split(' -- ')
    if (arr[2] && arr[2].indexOf('Chrome') > 0) {

    // 累加 chrome 的数量
        chromeNum++
    }
})
// 监听读取完成
rl.on('close', () => {
    console.log('chrome 占比：' + chromeNum / sum)
})