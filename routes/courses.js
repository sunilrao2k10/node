const Joi = require('joi');
const express = require('express');
const router = express.Router();

const courses = [
    { 'id': 1, 'name': 'sunil' },
    {'id': 2, 'name': 'sunil yadav' },
    {'id': 3, 'name': 'sunil rao'}
    ];

router.get('/', (req, res) => {
    res.send([1, 2, 3, 4, 5]);
});

router.post('/', (req, res) => {
    const validate = validation(req.body);
    if (validate.error) {
        res.status(400).send(validate.error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('THe coures with given ID not found')
    res.send(course);
});

function validation(body){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(body, schema);
}

module.exports = router;