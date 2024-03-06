// sitesRoutes.js

const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');

router.get('/', UserController.getAll);
router.post('/add', UserController.addUser);
router.post('/update/:id', UserController.updateUser);

module.exports = router;
