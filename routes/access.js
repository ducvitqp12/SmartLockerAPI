const express = require('express');
const Access = require('../models/accesses.js');
const Locker = require('../models/lockers.js');
// const Version = require('../models/dataVersion');
const { find } = require('../models/accesses.js');
const router = express.Router();

//Post Method
router.post('/add', async (req, res) => {
    const data = new Access({
        createdBy: req.body.createdBy,
        accessTime: req.body.accessTime,
        lockerId: req.body.lockerId
    })

    try {
        const doesLockerExit = await Locker.exists({ _id: data.lockerId })
        if (doesLockerExit == null) {
            throw new Error('Locker does not exist')
        }
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
// Get Access by device IMEI
router.post('/getAccess', async (req, res) => {
    const controllerDeviceImei = req.body.controllerDeviceImei
    // const version = req.body.version

    try {
        const lockers = await Locker.find({ controllerDeviceImei: controllerDeviceImei })
        // console.log(lockers.length)
        // const currentVersion = await Version.findOne()
        var accesses = []
        for(let i = 0; i < lockers.length; i++){
            try {
                const access = await Access.findOne({lockerId: lockers[i]._id})
                accesses.push(access)
            }
            catch (error) {
                res.status(400).json({ message: error.message })
            }
        }
        // lockers.forEach(element => {
        //     const access = findAccess(element)
        //     accesses.push(access)
        // });
        // console.log(accesses)   
        const data = {
            data: accesses
            // version: currentVersion.accessVersion
        }

        res.json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

var findAccess = async function(locker) {
    const access = await Access.findOne({lockerId: locker._id})
    // console.log(access._id)
    return access
}

router.get('/create', async (req, res) => {
    const lockers = await Locker.find({})
    for(let i = 0; i < lockers.length; i++){
        const data = new Access({
            lockerId: lockers[i]._id
        })
        try {
            const dataToSave = await data.save();
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
    res.status(200)
    
})

// router.post('/update', async (req, res) => {
//     console.log(req)
//     const new_access = req.body
//     const access = await Access.findOne({ lockerId: new_access._id })
//     if (access == null){
//         const data = new Access({
//             createdBy: new_access.createdBy,
//             accessTime: new_access.accessTime,
//             lockerId: new_access.lockerId,
//             action: new_access.action,  
//             doorState: new_access.doorState,
//             employeeId: new_access.employeeId,
//             recvData: new_access.recvData,
//             status: new_access.status,
//             health: new_access.health
//         })
//         try {
//             const dataToSave = await data.save();
//             res.status(200).json(dataToSave)
//         }
//         catch (error) {
//             res.status(400).json({ message: error.message })
//         }
//     }
//     else{
//         updateAccess(access, new_access, res)
//     }
    
// })

router.patch('/update', async (req, res) => {
    try {
        const id = req.body.accessId;
        // console.log(req.body)
        const updatedData = req.body;
        const options = { new: true, version: true };

        const result = await Access.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
var updateAccess = async function(access, new_access, res){
    try {
        const result = await access.update(new_access)
        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}


//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Access.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;