const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookies = require('cookies-parser');
const flash = require('connect-flash');
const path = require('path')

const app = express();
const port = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true}))

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home')
})

app.use(expressLayouts);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');


app.listen(port, () => {
    console.log(` Listening to port ${port}`)
});