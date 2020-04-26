const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const {Users} = require('../models/users.js');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

// post api for add auth
router.post('/', async (req, res) => {        
    const validate = validationAuth(req.body);
    if(validate.error) return res.status(400).send(validate.error.details[0].message);

    let user = await Users.findOne({phone: req.body.phone});
    if (!user) return res.status(400).send('Invalid username or password'); 
    
    let isValidPassword = await bcrypt.compare(req.body.password, user.password)
    if(!isValidPassword) return res.status(400).send('Invalid username or password'); 
   
    const token = user.generateAuthToken();
    
    res.header('x-auth-token', token).send({name: user.name, status: "login successfully"});
});

//validation wih Joi
const validationAuth = function validation(auth){
    const schema = {        
        phone: Joi.string().min(10).max(10).required(), 
        password: Joi.string().min(5).max(1024).required()        
    }
    return Joi.validate(auth, schema);
}


module.exports = router;