const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const register = (req, res, next) => {

    bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
        if (err) {
            res.json({
                error: err
            })
        }

        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    let user = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: hashedPass,
                    })
                    user.save()
                        .then(user => {
                            res.json({
                                message: 'User added successfully'
                            })
                        })
                        .catch(error => {
                            res.json({
                                message: 'An error occured!'
                            })
                        })
                } else {
                    res.json({
                        message: 'Email existed'
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })

    })
}

const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password
    // User.findOne({ $or: [{ email: username }, { phone: username }] })
    User.findOne({ email: username })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }
                    if (result) {
                        let token = jwt.sign({ name: user.name }, process.env.SECRET, { expiresIn: '1h' })
                        res.json({
                            message: 'Login Successful',
                            token
                        })
                    } else {
                        res.json({
                            message: 'Password does not match'
                        })
                    }
                })
            }
            else {
                res.json({
                    message: 'No user exist'
                })
            }
        })
}

module.exports = {
    register,
    login
}
