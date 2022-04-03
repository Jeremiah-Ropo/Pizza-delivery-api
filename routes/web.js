const authController = require("../app/http/controllers/authControllers");
const cartController = require("../app/http/controllers/customers/cartController");
const homeController = require("../app/http/controllers/homeController");
const menuController = require("../app/http/controllers/customers/menuController")
const orderController = require("../app/http/controllers/customers/orderController")


//Authorization
const auth = require('../app/http/middlewares/auth');
const guest = require('../app/http/middlewares/guest')
function initRoutes(app){
    app.get('/', homeController().index);
    
    app.get('/cart', cartController().index);
    app.post('/update-cart', cartController().update);

    
    app.get('/login', guest, authController().login);
    app.post('/login', authController().postLogin);
    app.get('/logout', authController().Logout);

    
    app.get('/register', guest, authController().register);
    app.post('/register', authController().postRegister);


    app.get('/menu', menuController().menu);

    app.post('/order', orderController().store);
    app.get('/customer/orders', orderController().index)


    

}

module.exports = initRoutes;