const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const userAccount = new mongoose.Schema({
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
    userName:{
        require: true, 
        type: String,
        unique: true
    },
    password:{
        require: true, 
        type: String
    },
    token:{
        require:false,
        type:String
    }
})

module.exports = mongoose.model('UserAccount', userAccount)