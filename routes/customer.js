const {Customers, Validate} = require('../models/customer.js');
const express = require('express');
const router = express.Router();

//get api
router.get('/', async(req,res) => {
    const customer =  await Customers.find().sort('name');
    res.send(customer);
});

//post api
router.post('/', async (req,res) => {
    const validate = Validate(req.body);
    if (validate.error) {
        res.status(400).send(validate.error.details[0].message);
        return;
    }
    let customer = new Customers({      
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
    });
    customer = await customer.save();    
    res.send(customer);
});

// Update customer bases on ID
router.put('/:id', async (req, res) => {       
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    const customer =  await Customers.findByIdAndUpdate(req.params.id, {name: req.body.name},{new:true}); // update check database 
    if (!customer) return res.status(404).send('THe coures with given ID not found'); // if id not found
    res.send(customer); //update response
});

// get single data uisng ID 
router.get('/:id', async (req, res) => {
    const customer =  await Customers.findById(req.params.id);    
    if (!customer) return res.status(404).send('THe coures with given ID not found');       
    res.send(customer);
});

// remove single data uisng ID 
router.delete('/:id', async (req, res) => {
    const customer =  await Customers.findByIdAndRemove(req.params.id);    
    if (!customer) return res.status(404).send('THe coures with given ID not found');       
    res.send(customer);
});

module.exports = router;