// models/site.js

const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },

});

accountSchema.index({ name: 1 });

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
