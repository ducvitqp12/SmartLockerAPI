const express = require('express');
const Command = require('../models/commands.js');
const Locker = require('../models/lockers.js');
const router = express.Router();

//Post Method
router.post('/add', async (req, res) => {
    const data = new Command({
        createdBy: req.body.createdBy,
        commandType: req.body.commandType,
        lockerNumber: req.body.lockerNumber,
        isDone: req.body.isDone,
        deviceIMEI: req.body.deviceIMEI,
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
// Get Command by device IMEI
router.post('/getCommand', async (req, res) => {
    const controllerDeviceImei = req.body.controllerDeviceImei
    try {
        const commands = await Command.find({ controllerDeviceImei: controllerDeviceImei, isDone : false })

        const data = {
            data: commands,
            version: currentVersion.accessVersion
        }

        res.json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//Update Command
router.post('/update', async (req, res) => {
    const listCommand = req.body.commands
    // array = JSON.parse(req.body)
    listCommand.forEach(element => {
        updateCommand(element, res)
    }); 
    
})


//Update by ID Method
var updateCommand = async function(command, res)  {
    try {
        const id = command.id;
        const updatedData = command;
        const options = { new: true };

        const result = await Command.findByIdAndUpdate(
            id, updatedData, options
        )

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
        const data = await Command.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;