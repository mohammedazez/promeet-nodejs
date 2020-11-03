require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {Member} = require('../models/Member');

module.exports = {
    postMember: async(req, res) => {
        let register = await Member.findOne({email: req.body.email});
        if(register) return res.json('Email Sudah Tersedia');

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        register = {
            ...req.body,
            password: hash,
        };

        register = await Member.create(register);
        try {
            res.json({
                message: 'Success Register Member',
                register,
            })
        } catch (error) {
            res.status(500).send(error);
        }
    },

    getAllMemberRegister: async (req, res) => {
        const register = await Member.find({});
    
        try {
          res.json({
            message: "Success Get Data Member",
            register,
          });
        } catch (err) {
          res.status(500).send(err);
        }
      },

    memberLogin: async(req, res) => {
        try {
            const userMember = await Member.findOne({ email: req.body.email });

            if (userMember) {
              const pass = bcrypt.compareSync(req.body.password, userMember.password);
              if (pass) {
                const token = jwt.sign(userMember.toObject(), process.env.KEYWORD);
                res.json({
                  message: "MEMBER LOGIN SUCCESS",
                  token,
                });
              } else {
                res.status(400).json("wrong password");
              }
            } else {
              res.status(400).json("member not found");
            }
          } catch (err) {
            console.log(err);
          }
    }
}