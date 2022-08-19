const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const groupLocker = new mongoose.Schema({
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
    groupLockerName:{
        require: false, 
        type: String
    }
   
})

module.exports = mongoose.model('GroupLocker', groupLocker)