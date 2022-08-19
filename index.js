require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const fs = require('fs');
const GroupLocker = require('./models/groupLockers');

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');

    test()
})
const app = express();
app.use(cors())
app.use(express.json());

fs.readdir('./routes', (err, files) => {
    if (err)
        console.log(err);
    else {
        files.forEach(file => {
            const myArray = file.split(".");
            const dir = './routes/' + myArray[0]
            const routes = require(dir);
            app.use('/' + myArray[0], routes)
        })
    }
})
// const routes = require('./routes');

// app.use('/api', routes)

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})


async function test() {

    const doc1 = await GroupLocker.findOne({ _id: '62982db2ca6fa13f9f3cd2aa' });
  
    // Delete first 3 comments from `doc1`
    doc1.groupLockerName = "HaLLo";
    await doc1.save();
  
  }