const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookies = require('cookie-parser');
const flashConnect = require('connect-flash');
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')
const path = require('path');
const mongoose = require('mongoose')
const passport = require('passport')
const Emitter = require('events')



//App and port setup
const app = express();
const port = process.env.PORT || 3000;

// file .env setup
require('dotenv').config();

//Connecting to our database
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', ()=>{
    console.log('connected to database')
});

//Model
require('./app/models/menu');
require('./app/models/order');
require('./app/models/user');


//Using session with cookies setup;
app.use(cookies('PizzaDelivery'));

app.use(session({
    secret: 'PizzaDeliverySecretSession',
    saveUninitialized:true,
    store: MongoDbStore.create({mongoUrl: process.env.MONGO_URI, collection:'sessions',
                                mongooseConnection:db}),
    resave:true,
    cookie:{maxAge:1000 * 60 * 60 * 24 }//24hours
}))

const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)


const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


app.use(express.urlencoded({ extended: true}))

//Public files setup
app.use(express.static(__dirname + '/public'));

//Flash messages setup
app.use(flash());
app.use(express.json())

//Middleware
app.use((req,res,next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

//Template setup
app.use(expressLayouts);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');


//Router setup
require('./routes/web')(app);
app.use((req, res)=> {
    res.status(404).send('<h1>404, Page not found</h1>')
})


const server = app.listen(port, () => {
            console.log(`Listening to port ${port}`)
        });


//Socket

const io = require('socket.io')(server)
io.on('connection', (socket) => {
    //Join
    socket.on('join', (orderId) => {
        socket.join(orderId)
    })
})

eventEmitter.on('orderUpdated', (data) => {
    io.to(` order_${data.id}`).emit('orderUpdated', data)
})

eventEmitter.on('orderPlaced', (data)=> {
    io.to("adminRoom").emit('orderPlaced', data)
})


