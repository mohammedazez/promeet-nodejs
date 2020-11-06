const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { Profesi } = require("../../models/Profesi");
const { Profile } = require('../../models/Profile');
const { userLogin } = require("../userController");

module.exports = {
  homePage: async (req, res) => {
    const profesi = await Profesi.find();
    try {
      res.json({
        message: "Success Get Data Profesi",
        profesi,
      });
    } catch (error) {
      res.status(500).send({ message: `Internal Server ${error}` });
    }
  },

  profesiPage: async (req, res) => {    
    try {
      const profesi = await Profesi.findById(req.params.id)
      .select("_id nameProfesi ")
      .populate({
        path: "profileId ",
        select: "price startDateAvailable experience.nameExperience experience.yearExperience",
        
        populate: {
          path: "userId locationId",
          select: "fullName role nameLocation ",
        },
      }).where("userId.role === profesional")
      res.json({
        message: "Success Get Data Profesi with profile",
        profesi,
      });
    } catch (error) {
      res.status(500).send({ message: `Internal Server ${error}` });
    }
  },
  viewDataProfesional: async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.id)
      .populate({path: 'userId', select: 'fullName role'})
      if(profile.userId.role === "profesional") {
        res.json({
          message: 'Success View Data profesional',
          profile
        })
      } else {
        res.json({message: "role failed"})
      }
    } catch (error) {
      res.status(400).send(`Data is ${error}`);
    }
  },

};
