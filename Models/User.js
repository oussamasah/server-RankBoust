// models/site.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique:true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },

});

userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;
