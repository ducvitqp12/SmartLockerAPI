const { type } = require('express/lib/response');
const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const locker = new mongoose.Schema({
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
    number:{
        require: true,
        type: Number
    },
    groupLockerId: {
        require: false,
        type: ObjectId,
        ref: 'GroupLocker'
    }, 
    label:{
        require: false, 
        type: String
    }, 
    position:{
        require: false, 
        type: String
    },
    controllerDeviceImei:{
        require: false,
        type: String
    },
    column:{
        require: false,
        type: Number
    },
    row:{
        require: false,
        type: Number
    },
    page:{
        require: false,
        type: Number
    },
    available:{
        require: false,
        type: Number
    },
    // version:{
    //     require: true, 
    //     type: Number,
    //     default: -1
    // }
   
})

module.exports = mongoose.model('Locker', locker)