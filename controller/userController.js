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
        let userPro = await User.findById(req.params.id)
        userPro.fullName = req.body.fullName !== null ? req.body.fullName : userPro.fullName
        userPro.email = req.body.email !== null ? req.body.email : userPro.email
        userPro.numberPhone = req.body.numberPhone !== null ? req.body.numberPhone : userPro.numberPhone
        userPro.dob = req.body.dob !== null ? req.body.dob : userPro.dob
        userPro.address = req.body.address !== null ? req.body.address : userPro.address
        await userPro.save();
        console.log('userPro', userPro)

        let userProfile = await Profile.findOne( {userId: userPro._id})
       
        if(userProfile){
          userProfile.price = req.body.price ||  userProfile.price
          userProfile.description = req.body.description ||  userProfile.description
          userProfile.imgUrl = req.body.imgUrl || userProfile.imgUrl
          userProfile.imgKtp = req.body.imgKtp ||  userProfile.imgKtp
          userProfile.timeAvailable = req.body.timeAvailable ||  userProfile.timeAvailable
          userProfile.startDateAvailable = req.body.startDateAvailable ||  userProfile.startDateAvailable
          userProfile.endDateAvailable = req.body.endDateAvailable ||  userProfile.endDateAvailable
          userProfile.locationId = req.body.locationId || userProfile.locationId
          userProfile.experience = req.body.experience ||  userProfile.experience
          userProfile.profesiId = req.body.profesiId ||  userProfile.profesiId
          userProfile.serviceId = req.body.serviceId ||  userProfile.serviceId      
          await userProfile.save();
          // console.log('user profile', userProfile)

        }else {
          userProfile = await Profile.create({
            price: req.body.price,
            description: req.body.description,
            userId: userPro._id,
            imgUrl : req.body.imgUrl,
            imgKtp : req.body.imgKtp,
            timeAvailable: req.body.timeAvailable,
            startDateAvailable: req.body.startDateAvailable,
            endDateAvailable: req.body.endDateAvailable,
            locationId: req.body.locationId,
            experience: req.body.experience,
            profesiId: req.body.profesiId,
            serviceId: req.body.serviceId
          })
              // throw new Error('profile not found')
              userPro.profileId = userProfile._id
              await userPro.save()
        }
       
        console.log(userPro.profileId, 'userProp')
     
         res.json({
            message: "Ssuccess edit pro",
            data: {userPro, userProfile}
          })
    
      } catch (error) {
        console.log(error)
      }

    }
}