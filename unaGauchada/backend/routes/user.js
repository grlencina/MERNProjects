const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/signUp').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const newUser = new User({ username, password });

    newUser.save()
        .then(users => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res) => {
    User.findOne({ password: req.body.password }, function (err, res) { console.log(res)});
});

module.exports = router;