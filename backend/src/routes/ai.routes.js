const express = require('express');
const router = express.Router();
const aicontroller = require('../controllers/ai.controller');

// Changed from GET to POST because code reviews/large prompts 
// should always be sent in the request body.
router.post('/get-review', aicontroller);

module.exports = router;