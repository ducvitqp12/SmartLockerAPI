const { type } = require('express/lib/response');
const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const command = new mongoose.Schema({
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
    commandType:{
        require: true, 
        type: Number
    },
    lockerNumber:{
        require: false,
        type: Number
    },
    lockerId:{
        require: true,
        type: ObjectId,
        ref: 'Locker'
    },
    isDone:{
        require: false,
        type: Boolean
    },
    deviceIMEI:{
        require:false,
        type: String
    }
})

module.exports = mongoose.model('Command', command)