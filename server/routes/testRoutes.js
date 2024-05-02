const { createDiscussionTest,  getDiscussionTest,  testConsole } = require('../controllers/testController')
const express = require('express');
const router = express.Router();

router.get('/createDiscussion', createDiscussionTest )
router.get('/testconsole', testConsole )

module.exports = router;