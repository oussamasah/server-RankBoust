// models/site.js

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    msg: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    isReaded: {
        type: Boolean,
        default: false
    },
    site:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Site"
    },
    created_at: {
        type: Date,
        default: Date.now
    },

});

notificationSchema.index({ name: 1 });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
