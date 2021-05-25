const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../../config/keys');
const errorHandler = require('../../utils/errorHandler')

module.exports.getById = async (req, res) => {
    req.body.user = req.body.user || {};
    const user = await User.findOne({ email: req.body.user.email })
        .catch(err => console.log('errrrr'));
    if(user) {
        console.log('user')
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

module.exports.getAll = async function (req, res) {
    const users = await User.find()
        .then(users => {
            res.status(200).json({
                users: users
            })
        })
        .catch(err = errorHandler(res, err))

}