const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');

const User = require('../models/user');

app.get('/user', function(req, res) {

    let from = Number(req.query.from) || 0;
    let limit = Number(req.query.limit) || 5;

    User.find({ state: true }, 'name email role state img')
        .skip(from)
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.count({ state: true }, (err, cont) => {
                res.json({
                    ok: true,
                    users,
                    total: cont
                })
            })
        });

})

app.post('/user', function(req, res) {
    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        //userDB.password = null;

        res.json({
            ok: true,
            user: userDB
        })
    });
})

app.put('/user/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'state']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        })
    });
})

app.delete('/user/:id', function(req, res) {

    let id = req.params.id;

    //User.findByIdAndRemove(id, (err, userDeleted) => {
    let updateState = {
        state: false
    }

    User.findByIdAndUpdate(id, updateState, { new: true }, (err, userDeleted) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!userDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'user not found'
                }
            });
        }

        res.json({
            ok: true,
            user: userDeleted
        });
    });

})

module.exports = app;