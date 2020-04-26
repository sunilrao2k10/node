const config = require('config');
const jwt = require('jsonwebtoken');
const {validation, Users} = require('../models/users.js');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

// post api for add genres
router.post('/', async (req, res) => {        
    const validate = validation(req.body);
    if(validate.error) return res.status(400).send(validate.error.details[0].message);
    let user = await Users.findOne({phone: req.body.phone});
    if (user) return res.status(400).send('User Already Registered'); 
    user = new Users({
        name: req.body.name,
        phone: req.body.phone,
        password: req.body.password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
    user = await user.save();
    // set jwt token and send reponse to client
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send({
        name: req.body.name,
        phone: req.body.phone
    });
});

module.exports = router;