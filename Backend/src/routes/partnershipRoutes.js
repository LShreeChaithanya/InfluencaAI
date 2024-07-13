const express = require('express');
const partnershipController = require('../controllers/partnershipController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, partnershipController.getPartnershipData);

module.exports = router;