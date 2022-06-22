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
    socket.emit('connected');
})

app.get('/api/todolist/:id', async (req,res) => {
    try {
        const id = req.params.id;
        const data = await db.getTodoList(id);
        if (data) {
            return res.status(200).json(data);
        } else {
            return res.status(404).json({message: 'not found'});
        }
    } catch(e) {
        return res.status(404).json({message: 'not found'});
    }
})
app.post('/api/todolist', async (req,res) => {
    const newTodoList = req.body;
    const addedTodoList = await db.addTodoList(newTodoList);
    return res.status(201).json(addedTodoList);
})
app.put('/api/todolist', async (req,res) => {
    const todoList = req.body;
    const updatedList = await db.updateTodoList(todoList);
    //update existing list in mongo
    return res.status(204).json(updatedList);
})

app.get('/', async (req, res) => {
  const root = path.join(__dirname, '..', 'client', 'build')
  app.use(express.static(root));
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
})

module.exports.app = app;
app.listen(process.env.PORT || 8080);
