const express = require('express');
const deletedata = require('../controllers/deletedata');
const router = express.Router();

// Using DELETE method for deletion
router.delete('/delete/:id', deletedata);

module.exports = router;
