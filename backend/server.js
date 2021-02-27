const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const connectDB = require("./config/db");

const flat = require("./models/flat");

const appRoutes = require("./routes/appRoutes");

const app = express();

app.use(express.json());

app.use(cors());

dotenv.config();

app.use("/",appRoutes);

connectDB();

app.listen(5000, () => {
    console.log("Server is up and running on port 6000");
});