const express = require('express');
const router = express.Router();


const { auth } = require('../helper/auth');     //untuk login
const {userRegister, userLogin} = require('../controller/userController');

router.get('/auth', auth, (req, res) => {
    res.json({
        message: 'Page for Admin/User/Profesional',
        member: req.body,
    });
});
router.post('/add-user', userRegister);
router.post('/user/login', userLogin);
