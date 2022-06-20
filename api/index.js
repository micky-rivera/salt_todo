const express = require('express');
const path = require('path');
const cors = require('cors');
const fetch = require('node-fetch');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
app.use(cors());

io.on('connection', socket => {
    console.log('connected', socket.id);
    socket.emit('connected');
})

app.get('/', async (req, res) => {
  const root = path.join(__dirname, '..', 'client', 'build')
  app.use(express.static(root));
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
})

module.exports.app = app;
app.listen(process.env.PORT || 8080);
