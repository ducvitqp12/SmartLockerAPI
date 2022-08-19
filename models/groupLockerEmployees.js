const { type } = require('express/lib/response');
const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const groupLockerEmployee = new mongoose.Schema({
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
    groupEmployeeId: {
        require: true,
        type: ObjectId,
        ref: 'GroupEmployee'
    },
    groupLockerId: {
        require: true,
        type: ObjectId,
        ref: 'GroupLocker'
    },
    // version:{
    //     require: true, 
    //     type: Number,
    //     default: -1
    // }
})

module.exports = mongoose.model('GroupLockerEmployee', groupLockerEmployee)