require('./db/index');
require('dotenv').config();

const PORT = process.env.PORT;
const SESSION_SECRET = process.env.SESSION_SECRET;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

var express = require('express');
var path = require('path');

const app = express();
const bodyParser = require('body-parser');

const session = require('express-session');

const authRoutes = require('./routes/auth');
const livadaRoutes = require('./routes/livada');


const mongoose = require('mongoose');

const User = require('./db/users');

app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    maxAge: 60 * 60 * 1000 // 1 hour
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use('/auth', authRoutes);
app.use('/livada', livadaRoutes);


const createAdminUser = async () => {
    const existingAdmin = await User.findOne({ username: 'admin' });

    if (existingAdmin) {
        console.log('Admin user already exists');
        return;
    }

    const adminUser = new User({
        username: ADMIN_USERNAME,
        password: ADMIN_PASSWORD,
        role: 'admin'
    });
    await adminUser.save();
};
mongoose.connection.once('open', () => {
    console.log('✅ Conexiune la MongoDB stabilită!');
    createAdminUser();
});


app.get('/', function (req, res) {
    res.render('Login');
});

app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
});