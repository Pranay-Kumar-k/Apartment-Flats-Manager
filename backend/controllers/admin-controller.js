const express = require("express");
const User =  require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// dotenv.config();

const {validationResult} = require("express-validator");

const registerUser = async (request,response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    const emailExists = await User.findOne({email:request.body.email});

    if(emailExists) {
        return response.status(400).json("Email already registerd");
    }
    const hashedPassword = await bcrypt.hash(request.body.password, 
        await bcrypt.genSalt(10)
    );

    const user = new User({
        email:request.body.email,
        password:hashedPassword,
        name:request.body.name
    });

    try {
        const savedUser = await user.save();
        response.send(savedUser);
    }
    catch(err) {
        response.status(400).send(err);
    }
}

const loginUser = async (req, res) => {
    try {
  
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  // console.log(user)
      if (!user) {
        throw new Error("Account doesn't exists");
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
  // console.log(validPassword)
  // const authToken = jwt.sign(data, process.env.SECRET_KEY);

      if (validPassword) {
        const { email,name } = user;
        const data = { email: email };
        const authToken = jwt.sign(data, process.env.SECRET_KEY);
        console.log(authToken)
        res.json({
          auth: email,
          name:name,
          token:authToken,
        //   user,
          message: "Logged in successfully",
        });
      } else {
        throw new Error("Wrong password");
      }
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  };



module.exports = {registerUser,loginUser}