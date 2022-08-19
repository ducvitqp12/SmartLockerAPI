const { type } = require('express/lib/response');
const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const level = new mongoose.Schema({
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
    _level:{
        require: true, 
        type: Number
    },
    buildingId: {
        require: true,
        type: ObjectId,
        ref: 'Building'
    }
   
})

module.exports = mongoose.model('Level', level)