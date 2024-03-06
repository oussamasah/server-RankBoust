// sitesRoutes.js

const express = require('express');
const router = express.Router();
const SitesController = require('../Controllers/SiteController');

router.get('/', SitesController.getAll);
router.get('/add', SitesController.addSite);
router.post('/update/:id', SitesController.updateSite);

module.exports = router;
