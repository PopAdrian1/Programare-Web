require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./Routes/auth');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sesiunea TREBUIE sa fie inainte de static
app.use(session({
  secret: 'secret_random_123',
  resave: false,
  saveUninitialized: false
}));

// Ruta principala cu verificare sesiune
app.get('/', (req, res) => {
  if (!req.session.user) return res.redirect('/login.html');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rutele de login/logout
app.use(authRoutes);

// Static DUPA rute - serveste css, js, login.html
app.use(express.static('public'));

app.listen(3000, () => console.log('Server pornit pe http://localhost:3000'));