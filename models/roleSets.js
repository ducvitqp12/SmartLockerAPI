const { type } = require('express/lib/response');
const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
const role = new mongoose.Schema({
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    updatedBy:{
        
        type: String,
    }, 
    createdBy:{
         
        type: String,
        default: "Admin"
    },
    roleName:{
        type: String
    },
    priority:{
        require: true, 
        type: Number
    },
    lockerId:{
        type: ObjectId,
        ref: 'Locker'
    }
})

module.exports = mongoose.model('Role', role)