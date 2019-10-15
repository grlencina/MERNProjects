const router = require('express').Router();
let Message = require('../models/message.model');

router.route('/:gauchada_id').get((req, res) => {
    Message.find({gauchada_id: req.params.gauchada_id})
        .then(messages => res.json(messages))
        .catch(err => res.status(400).json('Error: ' + err));
});

function getUserId(username) {
    User.find({username: username })
    .then(user => {
        if(user.length==1) {
            return user[0]._id;
        }
    });
}

router.route('/add').post((req, res) => {
    const recipient = this.getUserId(req.body.owner);
    const sender = this.getUserId(req.body.username);
        
    const message = new Message();
    message.recipient_id= recipient;
    message.sender_id= sender;
    message.gauchada_id= req.body.gauchada_id;
    message.message_sent= req.body.message;
    message.read= false;
        
    Message.save()
        .then(users => res.json('Message added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});