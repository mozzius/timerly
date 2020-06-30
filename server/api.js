const express = require('express');

const router = express.Router();

router.post('auth', (req, res) => {
  console.log('here')
  try {
    console.log(req.body)
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

module.exports = router;
