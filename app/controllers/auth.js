const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../../config/keys');
const errorHandler = require('../../utils/errorHandler')

module.exports.login = async (req, res) => {
    console.log('----------------------')
    req.body.user = req.body.user || {};
    const user = await User.findOne({ email: req.body.user.email })
        .catch(err => console.log('errrrr'));
    if(user) {
        const pass = bcrypt.compareSync(req.body.user.password, user.password);
        if(pass) {
            const token = jwt.sign({
                email: user.email,
                userId: user._id
            }, keys.jwt, {});

            res.status(200).json({ user: {
                    token: `Bearer ${token}`,
                    email: user.email,
                    _id: user._id,
                    username: user.username
                }
            })
        } else {
            res.status(401).json({ message: 'Invalid password' });
        }

    } else {
        res.status(404).json({ message: 'This email not found' });
    }
}

module.exports.register = async function (req, res) {
    req.body.user = req.body.user || {};
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.user.password;
    const user = new User({
        username: req.body.user.username,
        email: req.body.user.email,
        password: bcrypt.hashSync(password, salt),
        created: new Date()
    });
    return user.save()
        .then(user => {
            const token = jwt.sign({
                email: user.email,
                userId: user._id
            }, keys.jwt, {});

            res.status(200).json({ user: {
                    token: `Bearer ${token}`,
                    email: user.email,
                    _id: user._id,
                    username: user.username
                }
            })
        })
        .catch(err => {
            if(err.errors && err.errors.email) {
                let message = err.errors.email.message;
                res.status(404).json({ message });
            } else {
                errorHandler(res, err);
            }
        })
}