const authController = require("../app/http/controllers/authControllers");
const cartController = require("../app/http/controllers/customers/cartController");
const homeController = require("../app/http/controllers/homeController");
const menuController = require("../app/http/controllers/customers/menuController")
const orderController = require("../app/http/controllers/customers/orderController")
const adminOrderController = require('../app/http/controllers/admin/adminOrderController')
const statusController = require('../app/http/controllers/admin/statusController')


//Authorization
const auth = require('../app/http/middlewares/auth');
const guest = require('../app/http/middlewares/guest')
const admin = require('../app/http/middlewares/admin')

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

    app.post('/order', auth, orderController().store);
    app.get('/customer/orders', auth, orderController().index)
    app.get('/customer/orders/:id', auth, orderController().show)

    
    app.get('/admin/orders', admin, adminOrderController().index)

    app.post('/admin/orders/status', admin, statusController().update)

    

}

module.exports = initRoutes;