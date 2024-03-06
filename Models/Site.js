// models/site.js

const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },

    affaire: {
        type: String,
        required: true
    },

    affaire_status: {
        type: String,
        required: true
    },

    start_pack_at: {
        type: Date,
        
    },

    end_pack_at: {
        type: Date,
      
    },
    status: {
        type: String,
        
    },
    type_ref: {
        type: String,
        
    },
    keywords: {
        type: Array,
        
    },
    primary_keyword: {
        type: Array,
      
    },
    priority: {
        type: String,
    },
    analytics_token: {
        type: String,
    },
    ads_token: {
        type: String,
    },
    search_console_token: {
        type: String,
    },
    isActive: {
        type: Boolean,
    },
    
    created_at: {
        type: Date,
        default:Date.now
    },
    updated_at: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Account",
        
    },
    
    updated_at: {
        type: Date,
        default: Date.now
    }
});



const Site = mongoose.model('Site', siteSchema);

module.exports = Site;
