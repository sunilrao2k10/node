const mongoose = require('mongoose');
const Joi = require('joi');
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        require: true,        
    },
    phone: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 50        
    }
}); 

const Customers =  mongoose.model('Customers', customerSchema);

//validation wih Joi
const Valdation = function validation(customers){
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    }
    return Joi.validate(customers, schema);
}

exports.Customers = Customers;
exports.Validate = Valdation;