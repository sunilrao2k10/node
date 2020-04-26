const config = require('config');
const monggose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const userSchema = new monggose.Schema({
    name : {
        type: String,
        minlength: 5,
        maxlength: 50,
        require: true
    },
    phone : {
        type: Number,
        minlength: 10,
        maxlength: 10,
        require: true,
        unique:true
    },
    password : {       
        type: String,
        minlength: 5,
        maxlength: 1024,
        require: true
    }
});
userSchema.methods.generateAuthToken = function(){        
    const token = jwt.sign({_id:this.id}, process.env.JWT_PPRIVATE_KEY);       
    return token;
}
const Users = monggose.model('Users', userSchema);

//validation wih Joi
const validationUser = function validation(users){
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(10).max(10).required(), 
        password: Joi.string().min(5).max(1024).required()        
    }
    return Joi.validate(users, schema);
}

exports.validation = validationUser;
exports.Users = Users;
exports.userSchema = userSchema;

