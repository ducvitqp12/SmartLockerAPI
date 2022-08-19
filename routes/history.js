const express = require('express');
const Access = require('../models/accesses.js');
const History = require('../models/histories.js');
const Locker = require('../models/lockers.js');
// const Version = require('../models/dataVersion');
const { find } = require('../models/accesses.js');
const router = express.Router();


router.post('/add', async (req, res) => {
    // console.log(req.body)
    const data = new History({
        // createdBy: req.body.createdBy,
        accessTime: req.body.accessTime,
        lockerId: req.body.lockerId,
        employeeId: req.body.employeeId,
        action: req.body.action,
        doorState: req.body.doorState,
        status:  req.body.status, 
        health: req.body.health
    })
    console.log(data)
    try {
        const doesLockerExit = await Locker.exists({ _id: data.lockerId })
        if (doesLockerExit == null) {
            throw new Error('Locker does not exist')
        }
        const dataToSave = await data.save();
        console.log(dataToSave)
        res.status(200).json(dataToSave)
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
})

router.post('/updateDoorState', async (req, res) => {
    const listDoorState = req.body.doorStates
    if((listDoorState != null) && (listDoorState.lengh > 0)){
        var lstId = new Array
        var lstDoorStatus = new Array
        listDoorState.forEach(element => {
            lstId.push(element.lockerId)
            lstDoorStatus.push(element.doorState)
        });
        var accesses = new Array
        lstId.forEach(element => {
            var access = findAccess(element)
            accesses.push(access)
        })
        if((accesses != null) && (accesses.lengh > 0)){
            for(let i = 0; i < accesses.length; i++){
                updateAccess(accesses[i], lstDoorStatus[i], res)
                updateHistory(accesses[i], res)
            } 
        }
        
    }
})

var findAccess = async function(id) {
    const access = await Access.findOne({ lockerId: id })
    return access
}

//Update by ID Method
var updateAccess = async function(access, doorState, res)  {
    try {
        await Access.updateOne({
            lockerId: access.lockerId
        }, { doorState: doorState }, { upsert: true });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

var updateHistory = async function(access, res)  {
    try {
        const data = History({
            lockerId: access.lockerId,
            status: access.status,
            doorState: access.doorState,
            accessTime: access.accessTime,
            action: access.action,
            employeeId: access.employeeId,
            recvData: access.recvData,
            createBy: "Device"
        })
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = router;