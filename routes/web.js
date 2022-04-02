const authController = require("../app/http/controllers/authControllers");
const cartController = require("../app/http/controllers/customers/cartController");
const homeController = require("../app/http/controllers/homeController");

function initRoutes(app){
    app.get('/', homeController().index);
    
    app.get('/cart', cartController().index);
    app.post('/update-cart', cartController().update);

    
    app.get('/login', authController().login);
    app.post('/login', authController().postLogin);

    
    app.get('/register', authController().register);
    app.post('/register', authController().postRegister);


    app.post('/register', (req, res) => {
        res.redirect('/')
    });
}

module.exports = initRoutes;