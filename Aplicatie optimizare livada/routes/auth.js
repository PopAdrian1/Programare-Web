const express = require('express');
const router = express.Router();
const User = require('../db/users');
const requireAdmin = require('../middleware/requireAdmin');
const requireLogin = require('../middleware/requireLogin');
const Livada = require('../db/modelLivada');

router.get('/Login', (req, res) => {
    res.render('Login');
});

//Ruta pentru înregistrare
router.get('/Register', (req, res) => {
    res.render('Register');
});

router.post('/Register', async (req, res) => {
    const { username, password, role } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = new User({ username, password, role });
    await newUser.save();
    
    res.redirect('/auth/Login');
});


router.post('/Login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username});

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid username or password' });
    }

    req.session.user = user;
    res.redirect('/auth/Home');
});


router.get('/Home', requireLogin,(req, res) => {
    res.render('Home', { user: req.session.user });
});

router.get('/UserList', requireAdmin, async (req, res) => {
    const users = await User.find();
    res.render('UserList', { users });
}
);

router .get('/istoric', requireLogin, async (req, res) => {
    try {
        const istoric = await Livada.find().sort({ createdAt: -1 }).limit(10);
        res.render('Istoric', { istoric });
    } catch (e) {
        console.error("EROARE ISTORIC:", e);
        res.status(500).json({
            eroare: e.message,
            stack: e.stack
        });
    }   
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Eroare logout');
        }

        res.redirect('/auth/Login');
    });
});

router.delete('/istoric/:id', requireLogin, async (req, res) => {
    try {
        await Livada.findByIdAndDelete(req.params.id);

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

module.exports = router;