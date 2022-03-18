const express = require('express')
const app = express()
const fs = require('fs');
// const http = require('http')
const https = require('https')
const port = process.env.PORT || 3000

const ENV = process.env.ENV || 'local'
const certs = {
  key: (ENV == 'local') ? './certs/key.pem' : './certs/key.pem',
  cert: (ENV == 'local') ? './certs/server.crt' : './certs/server.crt'
  //key: (ENV == 'local') ? './certs/v2/privkey.pem' : './certs/v2/privkey.pem',
  //cert: (ENV == 'local') ? './certs/v2/fullchain.pem' : './certs/v2/fullchain.pem'
}
const server = https.createServer({
  key: fs.readFileSync(certs.key, 'utf8'),
  cert: fs.readFileSync(certs.cert, 'utf8'),
}, app).listen(port)
//console.log(server)
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
  }
})


//const expert = require('./expert/index')
//const client = require('./client/index')


/*const onConnection = (socket) => {
  
  let id = socket.request._query['id']
  console.log(`user connected ${id}`)
  socket.user_id = id
  socket.join(id)
  expert(io, socket)
  client(io, socket)
  
  
}*/

//io.on('connection', onConnection)

app.get('/', (req, res) => {
  res.send('Hello Socket.io Puntuador :)');
});