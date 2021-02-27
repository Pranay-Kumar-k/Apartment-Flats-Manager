const mongoose = require("mongoose");

const flats = require("./data/flats");

const flat = require("./models/flat");

const connectDB = require("./config/db");

connectDB();

const importData = async() => {
    try {
        await flat.deleteMany();
        await flat.insertMany(flats);
        console.log("Data imported successfully");
        process.exit();
    }
    catch(err) {
        console.log(`Error : ${err}`);
        process.exit(1);
    }
}

const destroyData = async() => {
    try {
        await flat.deleteMany();
        console.log("Data destroyed successfully");
        process.exit();
    }
    catch(err) {
        console.log(`Error : ${err}`);
        process.exit(1);
    }
}

if(process.argv[2] === "-d") {
    destroyData();
}
else {
    importData();
}