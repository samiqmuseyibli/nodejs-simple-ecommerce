const mongoose = require('mongoose');
const { isEmail } = require('validator');

const loginSchema = mongoose.Schema({
    email: {
        type: String,
        validate: [isEmail, 'incorrect email address']
    },
    password: {
        type: String,
        required: [true, 'you must enter a password']
    }
});


module.exports = mongoose.model('Login', loginSchema);