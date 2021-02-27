const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connection  = await mongoose.connect('mongodb://localhost/mvc', {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Mongodb connected: ${connection.connection.host}`);
    }
    catch(err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB