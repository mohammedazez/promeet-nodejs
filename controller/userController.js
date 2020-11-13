require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../models/User');
const {Profile} = require('../models/Profile');

module.exports = {
    userRegister: async(req, res) => {
        let register = await User.findOne({email: req.body.email});
        if(register) return res.json('email sudah tersedia');
        
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        register = {
            ...req.body,
            password: hash,
        }

        register = await User.create(register);
     
        try {
            res.json({
                message: 'Success Register User',
                register,
            })
        } catch (error) {
            res.status(400).send(`Data is ${error}`);
        }
    },

    getAllUserRegister: async (req, res) => {
        const register = await User.find({}).populate({path: 'profileId profesiId', select: 'price nameProfesi'});
    
        try {
          res.json({
            message: "Success Get Data User",
            register,
          });
        } catch (err) {
          res.status(400).send(err);
        }
      },

    userLogin: async(req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });

            if (user) {
              const pass = bcrypt.compareSync(req.body.password, user.password);
              if (pass) {
                const token = jwt.sign(user.toObject(), process.env.KEYWORD);
                res.json({
                  message: "USER LOGIN SUCCESS",
                  token,
                });
              } else {
                res.json({message: "wrong password"});
              }
            } else {
              res.json({message: "user not found"});
            }
          } catch (err) {
            console.log(err);
          }
    },

    profRegister: async (req, res) => {
      try {
        let register = await User.findOne({ email: req.body.email });
        if (register) return res.json('Email Sudah Tersedia');
    
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        
        register = {
          ...req.body,
          role: req.body.role || "profesional",
          password: hash,
        }

        register = await User.create(register);
        res.json({
          message: 'Success Register User',
          register,
        })
      } catch (error) {
        res.json(error);
      }
    },

    profLogin: async (req, res) => {
      try {
        const user = await User.findOne({ email: req.body.email });
  
        if (user) {
          const pass = bcrypt.compareSync(req.body.password, user.password);
          if (pass) {
            const token = jwt.sign(user.toObject(), process.env.KEYWORD);
            res.json({
              message: "Profesional LOGIN SUCCESS",
              token,
            });
          } else {
            res.json({message: "wrong password"});
          }
        } else {
          res.json({message: "user not found"});
        }
      } catch (err) {
        console.log(err);
      }
    },

    updateProfesional: async(req, res) => {
      try {
        const userPro = await User.findById(req.params.id)
        userPro.fullName = req.body.fullName !== null ? req.body.fullName : userPro.fullName
        userPro.email = req.body.email !== null ? req.body.email : userPro.email
        userPro.numberPhone = req.body.numberPhone !== null ? req.body.numberPhone : userPro.numberPhone
        await userPro.save();
        console.log('userPro', userPro)

        const userProfile = await Profile.findById(userPro._id)
        return userPro;
        userProfile.price = req.body.price !== null ? req.body.price :  userProfile.price
        userProfile.description = req.body.description !== null ? req.body.description :  userProfile.description
        userProfile.imgUrl = req.body.imgUrl !== null ? req.body.imgUrl : userProfile.imgUrl
        userProfile.imgKtp = req.body.imgKtp !== null ? req.body.imgKtp :  userProfile.imgKtp
        userProfile.timeAvailable = req.body.timeAvailable !== null ? req.body.timeAvailable :  userProfile.timeAvailable
        userProfile.startDateAvailable = req.body.startDateAvailable !== null ? req.body.startDateAvailable :  userProfile.startDateAvailable
        userProfile.endDateAvailable = req.body.endDateAvailable !== null ? req.body.endDateAvailable :  userProfile.endDateAvailable
        userProfile.locationId = req.body.locationId !== null ? req.body.locationId :  userProfile.locationId
        userProfile.experience = req.body.experience !== null ? req.body.experience :  userProfile.experience
        userProfile.profesiId = req.body.profesiId !== null ? req.body.profesiId :  userProfile.profesiId
        userProfile.serviceId = req.body.serviceId !== null ? req.body.serviceId :  userProfile.serviceId      
        await userProfile.save();

       

          res.json({
            message: "Ssuccess edit pro",
            data: {userPro, userProfile}
          })
    
      } catch (error) {
        console.log(error)
      }

    }
}