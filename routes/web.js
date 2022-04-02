const authController = require("../app/http/controllers/authControllers");
const cartController = require("../app/http/controllers/customers/cartController");
const homeController = require("../app/http/controllers/homeController");

//Authorization
const auth = require('../app/http/middlewares/auth')
function initRoutes(app){
    app.get('/', homeController().index);
    
    app.get('/cart', cartController().index);
    app.post('/update-cart', cartController().update);

    
    app.get('/login', auth, authController().login);
    app.post('/login', authController().postLogin);
    app.get('/logout', authController().Logout);

    
    app.get('/register', auth, authController().register);
    app.post('/register', authController().postRegister);

}

module.exports = initRoutes;