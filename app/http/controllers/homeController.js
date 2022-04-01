const { message } = require('laravel-mix/src/Log')
const Menu = require('../../models/menu.js')

function homeController() {
    return {
        async index(req,res){
            try {

                const menuList = await Menu.find({}).limit(5)

                return res.render('home', { menuList})
            } catch (error) {
                res.status(500).send({message: error.message || 'Error Message' })
            }
            
        }
    }
}

module.exports = homeController;