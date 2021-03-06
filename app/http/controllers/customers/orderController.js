const Order = require("../../../models/order")
const moment = require('moment');
const paystack = require("../../../../resources/js/paystack");

function orderController(){
    return {
        store(req, res){

            const { phone, address, userEmail, paymentType} = req.body
            if(!phone || !address || !userEmail) {
                req.flash('error', 'All field are required!')
            
                return res.redirect('/cart')
            }

            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone,
                userEmail,
                address
            })
            order.save().then(result => {
                Order.populate(result, { path: 'customerId'}, (err,placedOrder) => {
                    req.flash('success', 'Order has been placed successfully')

                    
                    delete req.session.cart 
                    //Emit
                    const eventEmitter = req.app.get('eventEmitter')
                    eventEmitter.emit('orderPlaced',placedOrder)

                    return res.redirect('customer/orders')
                })
            }).catch(err => {
                req.flash('error', 'Something went wrong')
                return res.redirect('/cart')
            })
        
        },

        async index( req,res) {
            const orders = await Order.find({customerId: req.user._id},
                null, {sort:{createdAt: -1}})
            res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
            return res.render('customers/order', {orders, moment})
        },

        async show(req,res) {
            const order = await Order.findById(req.params.id)
            //authorize user
            if(req.user._id.toString() === order.customerId.toString()){
                return res.render('customers/singleOrder', { order })
            }
            return res.redirect('/')
        },
        async inital(req,res){
            console.log(req.session.cart.totalPrice);

            const formData = {
                email:req.body.email,
                amount: (req.session.cart.totalPrice) * 100
            };
            formData.metadata = {
                address: req.body.address,
                phone: req.body.phone
            };
            const options = {
                url:'https://api.paystack.co/transaction/initialize',
                form: formData,
                headers:{
                    Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET}`,
                    "Content-Type": "application/json",
            }

        }
    }}
};

module.exports = orderController;