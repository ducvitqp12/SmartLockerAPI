const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const RFIDTag = new mongoose.Schema({
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
    },
    RFIDCode:{
        require: false, 
        type: String
    },
    status:{
        require: false, 
        type: String
    }
})

module.exports = mongoose.model('RFIDTag', RFIDTag)