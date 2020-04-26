const {validation, Genres} = require('../models/genres.js');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
// get api to find all genres
router.get('/', async (req, res) => {
    const genres = await Genres.find().sort('name');
    res.send(genres);
});

// post api for add genres
router.post('/', auth, async (req, res) => {
    const validate = validation(req.body);
    if(validate.error) return res.status(400).send(validate.error.details[0].message);
    let genres = new Genres({
        name: req.body.name
    });
    genres = await genres.save();
    res.send(genres);
});

module.exports = router;