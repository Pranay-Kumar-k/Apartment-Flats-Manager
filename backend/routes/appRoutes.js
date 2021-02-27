const express = require("express");
const router = express.Router();
const User = require("../models/admin");
const flat = require("../models/flat");

const {body} = require("express-validator");
const {getData,paginatedResults } = require("../controllers/data-controller");
const {registerUser,loginUser} = require("../controllers/admin-controller");
const validation_Middleware = [body("email").isEmail(), body("password").isLength({min:5})]

router.get("/data",paginatedResults(flat), getData);
router.post("/auth/register",validation_Middleware, registerUser);
router.post("/auth/login", loginUser);

module.exports = router;