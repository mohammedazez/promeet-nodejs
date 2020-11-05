require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../models/User');

module.exports = {
    userRegister: async(req, res) => {
        let register = await User.findOne({email: req.body.email});
        if(register) return res.json({message: 'email sudah tersedia', register});
        
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
        const register = await User.find({});
    
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
                res.status(400).json("wrong password");
              }
            } else {
              res.status(400).json("user not found");
            }
          } catch (err) {
            console.log(err);
          }
    }
}