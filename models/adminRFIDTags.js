const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const adminRFIDTag = new mongoose.Schema({
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
        type: Number
    },
    status:{
        require: false,
        type: String
    },
    // version:{
    //     require: true, 
    //     type: Number,
    //     default: -1
    // }
})

module.exports = mongoose.model('AdminRFIdTag', adminRFIdTag)