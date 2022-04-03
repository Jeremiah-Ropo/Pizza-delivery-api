const Order = require('../../../models/order')

function adminOrderController() {
    return {
        index(req, res){
            order.find({status: {$ne:'completed'}}, null,{sort: {createdAt:-1}
        }).populate('customerId', '-password').exec((err, orders)=>{
            return res.render('admin/orders', orders)
        })
        }
    }

}

module.exports = adminOrderController;