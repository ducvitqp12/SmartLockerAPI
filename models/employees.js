const { type } = require('express/lib/response');
const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const employee = new mongoose.Schema({
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
    name:{
        type: String
    },
    employeeCode:{
        type: String
    },
    groupEmployeeId:{
        
        type: ObjectId,
        ref: 'GroupEmployee'
    },
    codeLogic:{
        type: String
    },
    departmentId:{
        require: true,
        type: ObjectId,
        ref: 'Department'
    },
    email:{
        require: true,
        type: String
    },
    pinCode:{
        require: true,
        type: String
    },
    VIP:{
        type:Number
    },
    // version:{
    //     require: true, 
    //     type: Number,
    //     default: -1
    // }
})

module.exports = mongoose.model('Employee', employee)