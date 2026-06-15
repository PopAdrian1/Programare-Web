require('./db/index');
require('dotenv').config();

const PORT = process.env.PORT;
const adminUsername = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD;
const SECRET_KEY = process.env.SECRET_KEY;

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
    secret: SECRET_KEY,
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
    const existingAdmin = await User.findOne({ username: adminUsername });

    if (existingAdmin) {
        console.log('Admin user already exists');
        return;
    }

    const adminUser = new User({
        username: adminUsername,
        password: adminPassword,
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