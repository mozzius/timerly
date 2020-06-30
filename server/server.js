const express = require('express');
const path = require('path');
// const api = require('./api');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.post('/api/auth', (req, res) => {
  try {
    const { username, password } = req.body;

    // temp obvs
    if (username === 'Mozzius' && password === 'test') {
      res.json({ username: 'Mozzius', id: '1' });
    } else {
      throw 'Invalid username or password';
    }
  } catch (e) {
    res.sendStatus(401);
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

const port = process.env.PORT || 8080;

app.listen(port);

console.log('Timerly server is listening on port ' + port);
