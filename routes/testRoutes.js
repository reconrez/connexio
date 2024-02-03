const { createDiscussionTest,  getDiscussionTest,  testConsole } = require('../controllers/testController')
const express = require('express');
const router = express.Router();

router.get('/createDiscussion', createDiscussionTest )

module.exports = router;