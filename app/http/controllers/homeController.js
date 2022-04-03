const { message } = require('laravel-mix/src/Log')
const Menu = require('../../models/menu.js')
const User = require('../../models/user');

function homeController() {
    return {
        async index(req,res){
            try {

                const menuList = await Menu.find({}).limit(3)
                const menuLog = await Menu.find({}).sort({'_id': -1})
                
                return res.render('home', { menuList, menuLog})
            } catch (error) {
                res.status(500).send({message: error.message || 'Error Message' })
            }
            
        }
    }
}

module.exports = homeController;