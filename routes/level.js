const express = require('express');
const Level = require('../models/levels');
const Building = require('../models/buildings');
const router = express.Router();

//Post Method
router.post('/add', async (req, res) => {
    const data = new Level({
        createdBy: req.body.createdBy,
        _level : req.body._level,
        buildingId: req.body.buildingId
    })

    try {
        const doesBuildingExist = await Building.exists({ _id: data.buildingId })
        if (doesBuildingExist == null) {
            throw new Error('Building does not exist')
          } 
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const data = await Level.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Level.findByIdAndUpdate(
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
        const data = await Level.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;