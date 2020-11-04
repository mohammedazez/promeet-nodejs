const express = require('express');
const router = express.Router();

const { auth } = require('../helper/auth');     //untuk login
const {postAdmin, getAllAdminRegister, adminLogin} = require('../controller/adminController');
const {getAllUserRegister} = require('../controller/userController');
const { addDatarofesi, viewAllDataProfesi, viewDataProfesiById, editDataProfesi, deleteDataProfesi } = require('../controller/profesiController');
const { addDataTransfer, viewAllDataTransfer, ViewDataTransferById, editDataTransfer, deleteDataTransfer } = require('../controller/transferController');
const { addDataBooking, viewAllDataBooking, editDataBooking, deleteDataBooking, viewDataBookingById } = require('../controller/bookingController');
const { addDataLocation, viewAllDataLocation, viewDataLocationById, editDataLocation, deleteDataLocation } = require('../controller/locationController');
const { addDataService, viewAllDataService, viewDataServiceById, editDataService, deleteDataService} = require('../controller/serviceController');
const { addDataProfile, viewAllDataProfile, viewDataProfileById} = require('../controller/profileController');

router.get('/auth', auth, (req, res) => {
    res.json({
        message: 'Page for Admin/User/Profesional',
        member: req.body,
    });
});

// 1.admin
router.post('/add-admin', postAdmin);
router.get('/data/admin', getAllAdminRegister);
router.post('/admin/login', adminLogin);

// 2.user [member & professional]
router.get('/data/user', getAllUserRegister);

// 3.profesi
router.post('/add-profesi', addDatarofesi);
router.get('/data/profesi', viewAllDataProfesi);
router.get('/data/profesi/:id', viewDataProfesiById);
router.put('/edit-profesi/:id', editDataProfesi);
router.delete('/data/profesi/:id', deleteDataProfesi);

// 4.transfer
router.post('/add-transfer', addDataTransfer);
router.get('/data/transfer', viewAllDataTransfer);
router.get('/data/transfer/:id', ViewDataTransferById);
router.put('/edit-transfer/:id', editDataTransfer);
router.delete('/data/transfer/:id', deleteDataTransfer);

// 5.Location
router.post('/add-location', addDataLocation);
router.get('/data/location', viewAllDataLocation);
router.get('/data/location/:id', viewDataLocationById);
router.put('/edit-location/:id', editDataLocation);
router.delete('/data/location/:id', deleteDataLocation)

// 6.booking
router.post('/add-booking', addDataBooking);
router.get('/data/booking', viewAllDataBooking);
router.get('/data/booking/:id', viewDataBookingById);
router.put('/edit-booking/:id', editDataBooking);
router.delete('/data/booking/:id', deleteDataBooking);

// 7.service
router.post('/add-service', addDataService);
router.get('/data/service', viewAllDataService);
router.get('/data/service/:id', viewDataServiceById);
router.put('/edit-service/:id', editDataService);
router.delete('/data/service/:id', deleteDataService)

// 8. profile
router.post('/add-profile', addDataProfile)
router.get('/data/profile', viewAllDataProfile);
router.get('/data/profile/:id', viewDataProfileById);
// router.put()
// router.delete()


module.exports = router;