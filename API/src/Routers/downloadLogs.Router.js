const express = require('express');
const Downloadlogs = require('../Controllers/Downloadlogs.Controller');
const { authorization } = require('../middlewares/auth');

const router = express.Router();

// Define a route to download the entire folder as a .zip file
router.get('/download',authorization, Downloadlogs.downloadFolder);

module.exports = router;
