const router = require('express').Router();
let Gauchada = require('../models/gauchada.model');

router.route('/').get((req, res) => {
    Gauchada.find()
        .then(gauchada => res.json(gauchada))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const creationDate = Date.parse(req.body.creationDate);
    const expirationDate = Date.parse(req.body.expirationDate);
    const owner = req.body.owner;
    const resolver = req.body.resolver;

    const newGauchada = new Gauchada({
        title,
        description,
        creationDate,
        expirationDate,
        owner,
        resolver
    });

    newGauchada.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Gauchada.findById(req.params.id)
        .then(gauchada => res.json(gauchada))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Gauchada.findByIdAndDelete(req.params.id)
        .then(() => res.json('Gauchada deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Gauchada.findById(req.params.id)
        .then(gauchada => {
            gauchada.title = req.body.title;
            gauchada.description = req.body.description;
            gauchada.creationDate = Date.parse(req.body.creationDate);
            gauchada.expirationDate = Date.parse(req.body.expirationDate);
            gauchada.owner = req.body.owner;
            gauchada.owner_id = gauchada.owner_id;
            gauchada.resolver = req.body.resolver;

            gauchada.save()
                .then(() => res.json('Gauchada updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;