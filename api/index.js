const express = require('express');
require("dotenv").config();
const db = require('./db');
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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

io.on('connection', socket => {
    console.log('connected', socket.id);
    io.to(socket.id).emit('handshake');
    socket.on('add-to-room', (id)=>{
        socket.join(id);
        socket.on('update-list',()=>{
            socket.to(id).emit('update-list');
        })
    })
})

app.delete('/api/todolist', async (req, res)=> {
    const id = req.body.id;
    const returnId = await db.deleteTodoList(id);
    if (returnId) {
        return res.end;
    }
    return res.status(404).end;
})

app.get('/api/todolist/:id', async (req,res) => {
    const id = req.params.id;
    const data = await db.getTodoList(id);
    if (data) {
        return res.status(200).json(data);
    }
    return res.status(404).json({message: 'not found'});
})
app.post('/api/todolist', async (req,res) => {
    const newTodoList = req.body;
    const addedTodoList = await db.addTodoList(newTodoList);
    return res.status(201).json(addedTodoList);
})
app.put('/api/todolist', async (req,res) => {
    const todoList = req.body;
    const updatedList = await db.updateTodoList(todoList);
    return res.status(200).json(updatedList);
})

app.get('/', async (req, res) => {
  const root = path.join(__dirname, '..', 'client', 'build')
  app.use(express.static(root));
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
})

module.exports.app = app;
server.listen(process.env.PORT || 8080);
