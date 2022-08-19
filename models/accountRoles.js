const { type } = require('express/lib/response');
const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const accountRole = new mongoose.Schema({
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
    roleId:{
        require: true, 
        type: ObjectId,
        ref: 'Role'
    },
    userName:{
        require: false,
        type: String
    }
})

module.exports = mongoose.model('AccountRole', accountRole)