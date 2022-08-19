const express = require('express');
const Employee = require('../models/employees');
const Department = require('../models/departments');
const GroupLockerEmployee = require('../models/groupLockerEmployees');
const GroupEmployee = require('../models/groupEmployees');
const Locker = require('../models/lockers.js');
const AccountDetails = require('../models/userAccountDetails.js');
const Account = require('../models/userAccounts.js');
const router = express.Router();
const mongoose = require('mongoose');

//Post Method
router.post('/add', async (req, res) => {
    const data = new Employee({
        createdBy: req.body.createdBy,
        name: req.body.name,
        employeeCode: req.body.employeeCode,
        codeLogic: req.body.codeLogic,
        email:  req.body.email,
        pinCode: req.body.pinCode,
        groupEmployeeId: req.body.groupEmployeeId,
        departmentId: req.body.departmentId
    })

    try {
        const doesGroupEmployeeExit = await GroupEmployee.exists({ _id: data.groupEmployeeId })
        const doesdepartmentExit = await Department.exists({ _id: data.departmentId })
        if (doesGroupEmployeeExit == null) {
            throw new Error('Group Employee does not exist')
          } 
        if (doesdepartmentExit == null) {
            throw new Error('Department does not exist')
          } 
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Get Employee by device IMEI
router.post('/GetEmployees', async (req, res) => {
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
        const employees = []
        const accounts = []
        for (const gl of gls){
            const gle = await GroupLockerEmployee.findOne({ groupLockerId : mongoose.Types.ObjectId(gl)})
            // console.log(gle)
            const tmp_employees = await Employee.find({groupEmployeeId :  gle.groupEmployeeId })
            for (const employee of tmp_employees) {
                const accountDetail = await AccountDetails.findOne({ employeeCode: employee.employeeCode })
                const account = await Account.findOne({ userName: accountDetail.userName })
                // console.log(account)
                employees.push(employee)
                accounts.push(account)
            }
        }
        
        const data = {
            employees: employees,
            accounts: accounts,
            // version: currentVersion.accessVersion
        }
        console.log("Got an access")
        
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

        const result = await Employee.findByIdAndUpdate(
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
        const data = await Employee.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;