const express = require('express');
const router = express.Router();

const { auth } = require('../helper/auth');     //untuk login
const {postAdmin, getAllAdminRegister, adminLogin} = require('../controller/adminController');
const {getAllUserRegister} = require('../controller/userController');
const { addProfesi, viewAllDataProfesi, viewDataProfesiById, editDataProfesi, deleteDataProfesi } = require('../controller/profesiController');

router.get('/auth', auth, (req, res) => {
    res.json({
        message: 'Page for Admin/User/Profesional',
        member: req.body,
    });
});

router.post('/add-admin', postAdmin);
router.get('/data/admin', getAllAdminRegister);
router.post('/admin/login', adminLogin);

router.get('/data/user', getAllUserRegister);

// profesi
router.post('/add-profesi', addProfesi);
router.get('/data/profesi', viewAllDataProfesi);
router.get('/data/profesi/:id', viewDataProfesiById);
router.put('/edit-profesi/:id', editDataProfesi);
router.delete('/data/profesi/:id', deleteDataProfesi);

module.exports = router;