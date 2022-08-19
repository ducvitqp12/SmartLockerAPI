const { type } = require('express/lib/response');
const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const permission = new mongoose.Schema({
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
    permissionName:{
        
        type: String
    },
    permissionCode:{
        
        type: String
    },
    permissionEnum:{
        type: Number
    }
})

module.exports = mongoose.model('Permission', permission)