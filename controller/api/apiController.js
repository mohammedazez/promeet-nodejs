const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { Profesi } = require("../../models/Profesi");
// const {Profile} = require('../../models/Profile');

module.exports = {
  homePage: async (req, res) => {
    const profesi = await Profesi.find();
    try {
      res.json({
        message: "Success Get Data Profesi",
        profesi,
      });
    } catch (error) {
      res.status(500).send({message: `Internal Server ${error}`});
    }
  },

  profesiPage: async (req, res) => {
    const profesi = await Profesi.findById(req.params.id)
      .select("_id nameProfesi ")
      .populate({
        path: "profileId ",
        select: "price startDateAvailable experience.nameExperience",
        populate: {
          path: "userId locationId ",
          select: "fullName nameLocation nameExperience",
        },
      });
    try {
      res.json({
        message: "Success get Data Profesi By Id",
        profesi,
      });
    } catch (error) {
      res.status(500).send({ message: `Internal Server ${error}` });
    }
  },

};
