const { type } = require('express/lib/response');
const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const permisstionRole = new mongoose.Schema({
    permissionId:{
        require: true,
        type: ObjectId,
        ref: 'Permission'
    },
    roleId: {
        require: true,
        type: ObjectId,
        ref: 'Role'
    },
    isChecked:{
        require: true,
        type: Number
    }
})

module.exports = mongoose.model('PermisstionRole', permisstionRole)