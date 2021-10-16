const router = require('express').Router();
const apiControllers = require('../controller/apiControllers');
const { upload } = require('../middleware/multer');

router.get('/landing-page', apiControllers.landingPage);
router.get('/detail-page/:id', apiControllers.detailPage);
router.post('/booking-page', upload, apiControllers.bookingPage);

module.exports = router;