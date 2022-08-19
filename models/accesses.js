const { type } = require('express/lib/response');
const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const access = new mongoose.Schema({
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
    accessTime:{
        type: String
    },
    lockerId:{
        require: true,
        type: ObjectId,
        ref: 'Locker'
    },
    recvData:{
        type: String
    },
    action:{
        type: String
    },
    employeeId:{
        require: false,
        type: ObjectId,
        ref: 'Employee'
    },
    status:{
        type: String
    },
    doorState:{
        type: String
    },
    health:{
        type: String
    }
})

module.exports = mongoose.model('Access', access)