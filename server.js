const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookies = require('cookies-parser');
const flash = require('connect-flash');
const path = require('path')

const app = express();
const port = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true}))

app.use(express.static(__dirname + '/public'));


app.use(expressLayouts);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/cart', (req, res) => {
    res.render('customers/cart')
});

app.get('/login', (req, res) => {
    res.render('auth/login')
});

app.get('/register', (req, res) => {
    res.render('auth/register')
});



app.listen(port, () => {
    console.log(` Listening to port ${port}`)
});