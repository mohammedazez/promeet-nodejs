const bcrypt = require("bcryptjs");
const { response } = require("express");
const jwt = require("jsonwebtoken");

const { Profesi } = require("../../models/Profesi");
const { Profile } = require('../../models/Profile');
const {Booking} = require('../../models/Booking');

// const {User} = require("../../models/User");
// const { userLogin } = require("../userController");

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

  viewDataProfessionalByProfesi: async (req, res) => {    
    try {
      /*
       const professionalId = [];
      const professionals = [];

      const profiles = await Profesi.findById(req.params.id)
      .populate({path: 'profileId'});

      profiles.profileId.forEach((profile) => {
        professionalId.push(profile.userId)
      });

      const profesional = professionalId.map((id) => User.findById(id))

      await Promise.all(profesional).then((response) => 
      response.forEach((response) =>professionals.push(response) )
      )

      const dataProfesional = professionals.filter(
        (profesional) => profesional.role === 'profesional'
      )
      */
      const profesi = await Profesi.findById(req.params.id)
      .select("_id nameProfesi ")
      .populate({
        path: "profileId ",
        select: "price startDateAvailable experience.nameExperience experience.yearExperience",
        
        populate: {
          path: "userId locationId",
          select: "fullName role nameLocation ",
        },
      })
      res.json({
        message: "Success Get Data Profesi with profile",
        // dataProfesional,
        profesi
      });
    } catch (error) {
      res.status(500).send({ message: `Internal Server ${error}` });
    }
  },
  viewDetailDataProfesional: async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.id)
      .populate({path: 'userId', select: 'fullName role'})
      if(profile.userId.role === "profesional") {
        res.json({
          message: 'Success View Detail profesional',
          profile
        })
      } else {
        res.json({message: "not found"})
      }
    } catch (error) {
      res.status(400).send(`Data is ${error}`);
    }
  },
  
  bookingPage: async (req, res) => {
    const booking = await Booking.create(req.body);

    try {
      res.json({
        message: "Success Add Data Booking",
        booking,
      });
    } catch (err) {
      res.status(400).send({message: `Error is ${err}`});
    }
  },

};
