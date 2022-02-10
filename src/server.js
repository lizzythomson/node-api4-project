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
  try {
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: 'Unable to fetch users at this time. Please try again later',
    });
  }
});

server.post('/api/register', (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      res.status(400).json({ message: 'username and password are required' });
    } else {
      users.push(req.body);
      res.json(users[users.length - 1]);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Unable to register. Please try again later' });
  }
});

// async & await not needed for fake database, but would be needed for a real one
server.post('/api/login', async (req, res) => {
  try {
    const user = await users.find((user) => {
      return user.username === req.body.username;
    });
    if (!user || user.password !== req.body.password) {
      res
        .status(400)
        .json({ message: 'username and password are not correct' });
    } else {
      res.json({ message: `Welcome ${req.body.username}` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Unable to login. Please try again later' });
  }
});

server.use('/', (req, res) => {
  res.send('<h1>Hello, Heroku!</h1>');
});

module.exports = server;
