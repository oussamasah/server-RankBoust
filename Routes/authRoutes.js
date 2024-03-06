// sitesRoutes.js

const express = require('express');
const router = express.Router();
const AuthController = require('../Controllers/AuthController');
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
module.exports = router;
