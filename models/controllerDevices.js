const { type } = require('express/lib/response');
const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const controllerDevice = new mongoose.Schema({
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
    IMEI:{
        require: true, 
        type: String
    },
    levelId:{
        require: true,
        type: Number
    },
    description:{
        type: String
    },
    zone:{
        type: String
    },
    healthCheckTime:{
        type: Date  
    },
    controllerMacAddress:{
        type: String
    },
    buildingId:{
        type: ObjectId,
        ref: 'Building'
    },
    appVersion:{
        type: String
    }
})

module.exports = mongoose.model('ControllerDevice', controllerDevice)