const express = require('express');

const server = express();

server.use(express.json());

const users = [
  {
    username: 'Adriana',
    password: 'security123',
  },
  {
    username: 'Barry',
    password: 'password123',
  },
  {
    username: 'Candice',
    password: 'authenicate123',
  },
];

server.get('/api/users', (req, res) => {
  res.json(users);
});

server.post('/api/register', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ message: 'username and password are required' });
  } else {
    users.push(req.body);
    res.json(users);
  }
});

server.post('/api/login', async (req, res) => {
  const verifyUsername = await users.find(req.body.username);
  const verifyPassword = await users.find(req.body.password);
  if (!verifyUsername || !verifyPassword) {
    res.status(400).json({ message: 'username and password are not correct' });
  } else {
    res.json({ message: `Welcome ${req.body.username}` });
  }
});

server.use('/', (req, res) => {
  res.send('<h1>Hello, Heroku!</h1>');
});

module.exports = server;
