const express = require('express');
const jwt = require('jsonwebtoken');
const SQL = require('sql-template-strings');

const { makeQuery } = require('./db');
const { hash } = require('./utils');

// set secret key
const secret = process.env.SECRET;

// jwt expiry
const EXPIRY = 86400;

const router = express.Router();

router.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;
    const { rowCount, rows } = await makeQuery(
      SQL`SELECT * FROM users WHERE username=${username} AND password=${hash(
        password
      )} LIMIT 1`
    );

    if (rowCount > 0) {
      const { id, username, email } = rows[0];
      res.status(200).json({
        success: true,
        message: {
          id,
          username,
          email,
          expiresIn: EXPIRY,
          jwt: jwt.sign({ id }, secret, { expiresIn: EXPIRY }),
        },
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: 'Wrong username or password!' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exists = await makeQuery(
      SQL`SELECT EXISTS (SELECT 1 FROM users WHERE username=${username} OR email=${email})`
    );

    if (exists.rows[0].exists) {
      res
        .status(200)
        .json({ success: false, message: 'Username or email already taken' });
    } else {
      const val = await makeQuery(
        SQL`INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${hash(
          password
        )}) RETURNING id`
      );
      id = val.rows[0].id;
      res.status(200).json({
        success: true,
        message: {
          id,
          username,
          email,
          expiresIn: EXPIRY,
          jwt: jwt.sign({ id }, secret, { expiresIn: EXPIRY }),
        },
      });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ success: false, message: err });
  }
});

module.exports = router;
