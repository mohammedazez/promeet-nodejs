const {Profesi} = require('../../models/Profesi');

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
    }
}