const User = require('../models/users');
const jwt = require('jsonwebtoken');

exports.logIn = (req, res, next) => {
    const name = req.body.name;
    const password = req.body.password;
    User.findOne({
            name: name
        })
        .then(u => {
            if (!u) {
                res.status(404).send('err no user found !');
            } else {
                if (u.password !== password) {
                    res.send('wrong password');
                } else {
                    const acsessToken = jwt.sign(u.toJSON(), 'secret');
                    res.send({
                        'acsessToken': acsessToken
                    })
                }
            }
        })
        .catch(err => {
            res.send(err.message)
        })
}