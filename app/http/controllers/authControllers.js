const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')



function authController() {
    return {
        login(req,res){
            return res.render('auth/login')
        },
        //Check for login validation.
        postLogin(req, res, next) {
            passport.authenticate('local', (err, user, info) => {
                if(err) {
                    req.flash('error', info.message )
                    return next(err)
                }
                if(!user) {
                    req.flash('error', info.message )
                    return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                    if(err) {
                        req.flash('error', info.message ) 
                        return res.next(err)
                    }

                    return res.redirect('/')
                })
            })(req, res, next)
        },



        //Registration page.
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

           // Check if email exists 
         User.exists({ email: email }, (err, result) => {
            if(result) {
               req.flash('error', 'Email already taken')
               req.flash('name', name)
               req.flash('email', email)
               req.flash('street', street)
               return res.redirect('/register')
            }
        })

        // Hash password 
        const hashedPassword = await bcrypt.hash(password, 10)
        // Create a user 
        const user = new User({
            name,
            email,
            street,
            password: hashedPassword
        })

        user.save().then((user) => {
           // Login
           return res.redirect('/')
        }).catch(err => {
           req.flash('error', 'Something went wrong')
               return res.status(500).send({message:err.message} || 'Error occured')
        })
 
        },

        Logout(req, res){
            req.logout()
            return res.redirect('/login')
        }
    }
}

module.exports = authController;