const { type } = require('express/lib/response');
const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const history = new mongoose.Schema({
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    updatedBy:{ 
        type: String
    }, 
    createdBy:{
        type: String,
        default: "Admin"
    },
    accessTime:{
        require: true,
        type: String
    },
    lockerId:{
        // require: true,
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
        // require: true,
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
    },
    RfIdTag:{
        type:String
    }
})

module.exports = mongoose.model('History', history)