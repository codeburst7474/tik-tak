const express = require('express');
const updatedata = require('../controllers/updatedata');
const router = express.Router();

// :id is a route parameter that allows us to target a specific document
router.put('/update/:id', updatedata);

module.exports = router;
