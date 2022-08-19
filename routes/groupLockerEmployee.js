const express = require('express');
const GroupLockerEmployee = require('../models/groupLockerEmployees');
const GroupLocker = require('../models/groupLockers');
const GroupEmployee = require('../models/groupEmployees');
const Locker = require('../models/lockers.js');
const router = express.Router();
const mongoose = require('mongoose');

//Post Method
router.post('/add', async (req, res) => {
    const data = new GroupLockerEmployee({
        createdBy: req.body.createdBy,
        groupEmployeeId: req.body.groupEmployeeId,
        groupLockerId: req.body.groupLockerId
    })

    try {
        const doesGroupEmployeeExit = await GroupEmployee.exists({ _id: data.groupEmployeeId })
        const doesgroupLockerExit = await GroupLocker.exists({ _id: data.groupLockerId })
        if (doesGroupEmployeeExit == null) {
            throw new Error('Group Employee does not exist')
          } 
        if (doesgroupLockerExit == null) {
            throw new Error('Group Locker does not exist')
          } 
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Get by device IMEI
router.post('/GetGroupLockerEmployees', async (req, res) => {
    const controllerDeviceImei = req.body.controllerDeviceImei
    // const version = req.body.version
    try {
        // const currentVersion = await Version.findOne()
        const  lockers = await Locker.find({controllerDeviceImei: controllerDeviceImei})
        // console.log(locker[0].groupLockerId.toString())
        const gls = []
        for (const locker of lockers){
            if(gls.includes(locker.groupLockerId.toString())) continue
            else gls.push(locker.groupLockerId.toString())
        }
        const gles = []
        for (const gl of gls){
            const gle = await GroupLockerEmployee.findOne({ groupLockerId : mongoose.Types.ObjectId(gl)})
            gles.push(gle)
        }
        const data = {
            gles: gles,
            // version: currentVersion.accessVersion
        }
        
        res.json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await GroupLockerEmployee.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await GroupLockerEmployee.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;