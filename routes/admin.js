const router = require('express').Router();
const adminControllers = require('../controller/adminControllers');
const { upload, uploadMultiple } = require('../middleware/multer');
const auth = require('../middleware/auth');

router.get('/signin', adminControllers.viewSignin);
router.post('/signin', adminControllers.actionSignin);
router.use(auth);
router.get('/logout', adminControllers.actionLogout);
router.get('/dashboard', adminControllers.viewDashboard);
//user
router.get('/user', adminControllers.viewUser);
router.post('/user', adminControllers.addUser);
router.put('/user', adminControllers.editUser);
router.delete('/user/:id', adminControllers.deleteUser);
//enduser
//service
router.get('/service', adminControllers.viewService);
router.post('/service', adminControllers.addService);
router.put('/service', adminControllers.editService);
router.delete('/service/:id', adminControllers.deleteService);
//endservice
//bank
router.get('/bank', adminControllers.viewBank);
router.post('/bank', upload, adminControllers.addBank);
router.put('/bank', upload, adminControllers.editBank);
router.delete('/bank/:id', adminControllers.deleteBank);
//endbank
//item
router.get('/item', adminControllers.viewItem);
router.get('/item/show-image/:id', adminControllers.shomImageItem);
router.get('/item/:id', adminControllers.shomEditItem);
router.put('/item/:id', uploadMultiple, adminControllers.editItem);
router.post('/item', uploadMultiple,adminControllers.addItem);
router.delete('/item/:id/delete', adminControllers.deleteItem);
//enditem
//Detailitem
router.get('/item/show-detail-item/:itemId', adminControllers.viewDetailItem);
router.post('/item/add/feature', upload, adminControllers.addFeature);
router.put('/item/update/feature', upload, adminControllers.editFeature);
router.delete('/item/:itemId/feature/:id', adminControllers.deleteFeature);

router.post('/item/add/step', upload, adminControllers.addStep);
router.put('/item/update/step', upload, adminControllers.editStep);
router.delete('/item/:itemId/step/:id', adminControllers.deleteStep);
//EndDetailitem

//ShowDetailBooking
router.get('/booking', adminControllers.viewBooking);
router.get('/booking/:id', adminControllers.viewShowDetailBooking);
router.put('/booking/:id/confirmation', adminControllers.actionConfirmation);
router.put('/booking/:id/reject', adminControllers.actionReject);
//EndDetailBooking

module.exports = router;