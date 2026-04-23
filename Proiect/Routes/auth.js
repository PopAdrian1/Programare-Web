const express = require('express');
const router = express.Router();

const users = [
  { username: 'admin', password: '1234' },
  { username: 'ion', password: 'parola123' }
];

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.send('<p>Username sau parolă greșită! <a href="/login.html">Înapoi</a></p>');
  }

  req.session.user = username;
  res.redirect('/');
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login.html');
});

module.exports = router;