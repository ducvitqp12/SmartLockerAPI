const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const updateVersioningPlugin = require('mongoose-update-versioning');

const building = new mongoose.Schema({
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    updatedBy:{
        require: false,
        type: String,
    }, 
    createdBy:{
        require: false, 
        type: String,
        default: "Admin"
    }   
})

// building.plugin(updateVersioningPlugin);

module.exports = mongoose.model('Building', building)