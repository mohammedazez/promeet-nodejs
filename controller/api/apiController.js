const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {Profesi} = require('../../models/Profesi');
const {User} = require('../../models/User')

module.exports = {
    homePage: async (req, res) => {
        const profesi = await Profesi.find();
        try {
            res.json({
                message: 'Success Get Data Profesi',
                profesi
            })
        } catch (error) {
            res.status(500).send(`Data is ${error}`)
        }
    },

    profRegister: async(req, res) => {
        let register = await User.findOne({email: req.body.email});
        if(register) return res.json('Email Sudah Tersedia');
        
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        register = {
            ...req.body,
            role: req.body.role || "profesional",
            password: hash,
        }

        register = await User.create(register);
     
        try {
            res.json({
                message: 'Success Register User',
                register,
            })
        } catch (error) {
            res.status(400).send(error);
        }
    },
    profLogin: async(req, res) => {
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
                res.status(400).json("wrong password");
              }
            } else {
              res.status(400).json("profesional not found");
            }
          } catch (err) {
            console.log(err);
          }
    }
}