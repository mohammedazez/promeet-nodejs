require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../models/User');

module.exports = {
    postAdmin: async(req, res) => {
        let register = await User.findOne({email: req.body.email});
        if(register) return res.json('Email Sudah Tersedia');

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        register = {
            ...req.body,
            role: req.body.role || "admin",
            password: hash,
        };

        register = await User.create(register);
        try {
            res.json({
                message: 'Success Register Admin',
                register,
            })
        } catch (error) {
            res.status(400).send(error);
        }
    },

    getAllAdminRegister: async (req, res) => {
        const register = await User.find({});
    
        try {
          res.json({
            message: "Success Get Data Admin",
            register,
          });
        } catch (err) {
          res.status(400).send(err);
        }
      },

    adminLogin: async(req, res) => {
        try {
            const userAdmin = await User.findOne({ email: req.body.email });

            if (userAdmin) {
              const pass = bcrypt.compareSync(req.body.password, userAdmin.password);
              if (pass) {
                const token = jwt.sign(userAdmin.toObject(), process.env.KEYWORD);
                res.json({
                  message: "ADMIN LOGIN SUCCESS",
                  token,
                });
              } else {
                res.status(400).json("wrong password");
              }
            } else {
              res.status(400).json("admin not found");
            }
          } catch (err) {
            console.log(err);
          }
    }
}