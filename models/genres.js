const monggose = require('mongoose');
const Joi = require('joi');

const genresSchema = new monggose.Schema({
    name : {
        type: String,
        minlength: 0,
        maxlength: 50,
        require: true
    }
});

const Genres = monggose.model('Genres', genresSchema);

//validation wih Joi
const Validation = function validation(genres){
    const schema = {
        name: Joi.string().min(5).max(50).required()        
    }
    return Joi.validate(genres, schema);
}

exports.validation = Validation;
exports.Genres = Genres;
exports.genresSchema = genresSchema;

