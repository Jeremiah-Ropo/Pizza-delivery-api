const Menu = require('../../../models/menu')

function menuController() {
    return {
        async menu(req,res){
            try {

                const menuGuest = await Menu.find({}).limit(3)
                const menuList = await Menu.find({}).sort({'_id': -1})

                return res.render('menu', { menuGuest, menuList})
            } catch (error) {
                res.status(500).send({message: error.message || 'Error Message' })
            }
            
        },
        
    }
}

module.exports = menuController;