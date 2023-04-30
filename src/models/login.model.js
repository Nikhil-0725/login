const mongoose = require('mongoose');

const { Schema } = require('mongoose');

const LoginSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        duplicate: false,
    },
    password: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false,
    },
});

const Login = mongoose.model("Login", LoginSchema);

module.exports = Login;