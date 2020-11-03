const express = require('express');
const router = express.Router();

const { auth } = require('../helper/auth');
const {postAdmin, getAllAdminRegister, adminLogin} = require('../controller/adminController');
const {postMember, getAllMemberRegister, memberLogin} = require('../controller/memberController');

router.get('/auth', auth, (req, res) => {
    res.json({
        message: 'Page for Admin/User/Profesional',
        member: req.body,
    });
});

router.post('/add-admin', postAdmin);
router.get('/data/admin', getAllAdminRegister);
router.post('/admin/login', adminLogin);

router.post('/add-member', postMember);
router.get('/data/member', getAllMemberRegister);
router.post('/member/login', memberLogin);

module.exports = router;