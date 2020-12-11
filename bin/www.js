const serverHandle = require('../app.js')
const http = require('http')
const PORT = 9000

const server = http.createServer(serverHandle)
server.listen(PORT)
console.log('OK')

