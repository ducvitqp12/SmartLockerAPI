const express = require('express');
const Locker = require('../models/lockers.js');
const GroupLocker = require('../models/groupLockers');
const router = express.Router();

//Post Method
router.post('/add', async (req, res) => {
    const data = new Locker({
        createdBy: req.body.createdBy,
        groupLockerId: req.body.groupLockerId,
        number: req.body.number,
        label: req.body.label,
        position:  req.body.position,
        controllerDeviceImei: req.body.controllerDeviceImei,
        column: req.body.column,
        row: req.body.row,
        page: req.body.page,
        available: req.body.available
    })

    try {
        const doesgroupLockerExit = await GroupLocker.exists({ _id: data.groupLockerId })
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

// Get All Locker by device IMEI
router.post('/getAll', async (req, res) => {
    const controllerDeviceImei = req.body.controllerDeviceImei
    // const version = req.body.version

    try {
        // const currentVersion = await Version.findOne()
        const lockers = await Locker.find({controllerDeviceImei : controllerDeviceImei})
        const data = {
            data: lockers,
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

        const result = await Locker.findByIdAndUpdate(
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
        const data = await Locker.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;