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
    }
}