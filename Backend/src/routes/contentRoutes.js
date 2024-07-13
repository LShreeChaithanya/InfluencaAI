const express = require('express');
const contentController = require('../controllers/contentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, contentController.createPost);

module.exports = router;