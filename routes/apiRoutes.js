const express = require('express');
const router = express.Router();
const {User} = require('../models/User');
const { auth } = require('../helper/auth');     //untuk login
const {userRegister, userLogin, profRegister, profLogin, updateProfesional} = require('../controller/userController');
const { homePage, viewDataProfessionalByProfesi, viewDetailDataProfesional, bookingPage} = require('../controller/api/apiController');


router.get('/auth', auth, async (req, res) => {
    const member = await User.findById(req.body._id)
    .select('_id fullName email role numberPhone')
    .populate({path: 'profileId ', select: 'price description timeAvailable startDateAvailable endDateAvailable experience.nameExperience experience.yearExperience', 
    populate : {path: 'locationId serviceId', select : 'nameLocation nameService'}
    })
    res.json({
        message: 'Page for Admin/User/Profesional',
        member
    });
});



router.post('/user/register', userRegister);
router.post('/user/login', userLogin);

router.post('/prof/register', profRegister); 
router.post('/prof/login', profLogin);
router.get('/edit-prof/:id', updateProfesional);

router.get('/profesi', homePage);
router.get('/profesi/:id', viewDataProfessionalByProfesi);

router.get('/profesional/:id', viewDetailDataProfesional);
router.post('/add-booking', bookingPage);
module.exports = router;