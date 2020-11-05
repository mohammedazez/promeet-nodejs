const express = require('express');
const router = express.Router();

const { auth } = require('../helper/auth');     //untuk login
const {userRegister, userLogin} = require('../controller/userController');
const { homePage, profRegister, profLogin } = require('../controller/api/apiController');


router.get('/auth', auth, (req, res) => {
    res.json({
        message: 'Page for Admin/User/Profesional',
        member: req.body,
    });
});

router.post('/user/register', userRegister);
router.post('/user/login', userLogin);

router.post('/prof/register', profRegister);
router.post('/prof/login', profLogin);

router.get('/profesi', homePage);

module.exports = router;