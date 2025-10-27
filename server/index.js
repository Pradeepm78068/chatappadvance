const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
require('dotenv').config(); // Add dotenv for environment variables

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Match frontend URL
    methods: ['GET', 'POST'],
  },
});

const ClientModel = require('./models/Client');
const GroupModel = require('./models/Groups');

// Middleware
app.use(express.json());
app.use(cors({ origin: '*' })); // Match frontend URL

mongoose
  .connect(process.env.MONGO_URI, {
    retryWrites: true,
    w: 'majority',
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.post('/register', async (req, res) => {
  try {
    const { Name, Mail, PassWord } = req.body;
    const user = await ClientModel.findOne({ Mail });
    if (user) {
      return res.status(400).json({ message: 'Already registered' });
    }
    const newUser = await ClientModel.create({ Name, Mail, PassWord });
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Error occurred', error: err.message });
  }
});

app.post('/Login', async (req, res) => {
  try {
    const { Mail, PassWord } = req.body;
    const user = await ClientModel.findOne({ Mail });
    if (!user) {
      return res.status(404).json({ message: 'No record found' });
    }
    if (user.PassWord !== PassWord) {
      return res.status(401).json({ message: 'Wrong password' });
    }
    console.log('Logged in:', user.Name);
    res.json({ message: 'success', name: user.Name });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'Error occurred', error: err.message });
  }
});

app.post('/createGroup', async (req, res) => {
  try {
    const { Name } = req.body;
    const group = await GroupModel.findOne({ Name });
    if (group) {
      return res.status(400).json({ message: 'Group already exists' });
    }
    await GroupModel.create({ Name });
    res.status(201).json({ message: 'Group created' });
  } catch (err) {
    console.error('Error creating group:', err);
    res.status(500).json({ message: 'Error occurred', error: err.message });
  }
});

app.post('/LoginWithCode', async (req, res) => {
  try {
    const { Name } = req.body;
    const group = await GroupModel.findOne({ Name });
    if (!group) {
      return res.status(404).json({ message: 'No group found' });
    }
    res.json({ message: 'Joined' });
  } catch (err) {
    console.error('Error joining group:', err);
    res.status(500).json({ message: 'Error occurred', error: err.message });
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
  });

  socket.on('message', ({ text, sender, room }) => {
    io.to(room).emit('rec_msg', { text, sender });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server and Socket.IO running on http://localhost:3000');
});