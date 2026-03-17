const express = require('express');
const getdata = require('../controllers/getdata');
const router = express.Router();

router.get('/getdata', getdata);

module.exports = router;