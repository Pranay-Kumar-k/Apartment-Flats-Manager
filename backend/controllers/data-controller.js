const express = require("express");
const flat = require("../models/flat");
const mongoose = require("mongoose");
const flats = require("../data/flats");

  const db = mongoose.connection;
db.once("open", async () => {
  if ((await flat.countDocuments().exec()) > 0) {
    return;
  }
  User.insertMany(flats)
    .then(() => console.log("Users added Successfully"))
    .catch((err) => console.log("Error: " + err));
});

const getData = (request,response) => {
    response.json(response.pagination)
};


function paginatedResults(model) {
    return async (req, res, next) => {
      // const query  = req.query.q;
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      // let filterBy = filter == "tenant" ? 1 : filter == "owner" ? -1 : 0;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      const results = {};
  
      if (endIndex < (await model.countDocuments().exec())) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }
  
      if (startIndex > 0) {
        results.prev = {
          page: page - 1,
          limit: limit,
        };
      }
  
      try {
        results.current = await model.find().limit(limit).skip(startIndex).exec();
        // results  = await results.filter((item) => item.flat_type === filter)
        res.pagination = results
        next();
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    };
  }

module.exports = {getData,paginatedResults}