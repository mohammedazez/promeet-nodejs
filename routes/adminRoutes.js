const express = require('express');
const router = express.Router();

const { auth } = require('../helper/auth');
const {postAdmin, getAllAdminRegister, adminLogin} = require('../controller/adminController');
const {userRegister, getAllUserRegister, userLogin} = require('../controller/userController');
router.get('/auth', auth, (req, res) => {
    res.json({
        message: 'Page for Admin/User/Profesional',
        member: req.body,
    });
});

router.post('/add-admin', postAdmin);
router.get('/data/admin', getAllAdminRegister);
router.post('/admin/login', adminLogin);

router.post('/add-user', userRegister);
router.get('/data/user', getAllUserRegister);
router.post('/user/login', userLogin);

module.exports = router;