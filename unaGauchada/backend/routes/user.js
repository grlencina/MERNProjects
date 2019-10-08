const router = require('express').Router();
const Session = require('../models/session.model');
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/user/:username').get((req, res) => {
    Gauchada.find({username: req.params.username})
        .then(user => res.json(user._id))
        .catch(err => res.status(400).json('Error: ' + err));
        console.log(user);
});

router.route('/signUp').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const newUser = new User();
    newUser.username = username;
    newUser.password = newUser.generateHash(password);

    newUser.save()
        .then(users => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/logoff/:id').post((req, res) => {
    Session.findById(req.params.id, function(err,session) {
        if(err) {
            return session.send({
                success: false,
                message: "Server error: session not found."
            })
        }
        if(session){
            session.username = session.username;
            session.user_id = session.user_id;
            session.apertureTimeStamp = req.body.apertureTimeStamp;
            session.closureTimeStamp = Date.parse(new Date());
            session.active = false;

            session.save()
                .then(() => res.send({
                    success:true,
                    message: 'Session closed'
                }))
                .catch(err => res.send({
                    success:false,
                    message: 'Erorr:' + err
                }));
        }
    });
});

router.route('/login').post((req, res) => {    
    const username = req.body.username;
    const password = req.body.password;

    User.find({ username: username}, function(err, users){
        if(err){
            return res.send({
                sucess:false,
                message: "Error: server error1"
            });
        }
        if(users.length!=1) {
            return res.send({
                sucess:false,
                message: "Error: invalid info."
            });
        }
        
        const user = users[0];
        
        if(!user.validPassword(password)){
            return res.send({
                success:false,
                message: 'Error: invalid info'
            })
        }
        
        Session.find({user_id:user._id,activeSession:true}, function(err,sess){
            
            if(err){
                return res.send({
                    success: false,
                    message: 'Error: server error.'
                })
            }
            if(sess.length!=0){
                const session = sess[0];
                session.username = session.username;
                session.user_id = session.user_id;
                session.activeSession = false;
                session.apertureTimeStamp = Date.parse(session.apertureTimeStamp);
                session.closureTimeStamp = Date.parse(new Date());
    
                session.save();
            }
        });

        session = new Session({user_id:user._id});
        session.save((err, doc) => {
            if(err) {
                return res.send({
                    sucess: false,
                    message: 'Error: server error2 '+ err
                })
            }
            return res.send({
                success: true,
                message: 'Session registered',
                token: doc._id,
                username: user.username
            })
        });
    });
    
})

module.exports = router;