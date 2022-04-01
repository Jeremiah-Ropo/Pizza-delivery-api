const User = require('../../models/user')
const bcrypt = require('bcrypt')

function authController() {
    return {
        login(req,res){
            return res.render('auth/login')
        },
        register(req,res){
            return res.render('auth/register')
        },
        async postRegister(req,res){

            const { name, email, password, street } = req.body

            if (!name || !email || !password || !street){
                req.flash('error', "All fields are required")
                req.flash('name', name )
                req.flash('email', email)
                req.flash('street', street)
                return res.redirect('/register')
            }

            const existsUser = await User.findOne({email:email})
            if( existsUser ) {
                req.flash('error', "Email already exist")
                req.flash('name', name )
                req.flash('email', email)
                return res.redirect('/register')
            }
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10)

            //Createe a  user
            const user = new User({
                name,
                email,
                street,
                password: hashedPassword
            });
            user.save().then((user)=>{
                return res.redirect('/')
            }).catch(err => {
                req.flash('error', 'something went wrong')
                    return res.status(500).send({message: err.message} || 'Error occured')
            })
           




            return res.render('auth/register')
        }
    }
}

module.exports = authController;