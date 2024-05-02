const express = require('express');
const router = express.Router();
var { getDiscussions, createDiscussion, updateDiscussion, deleteDiscussion, getDiscussionById } = require('../controllers/discussionController');
var { getResponses, getResponsesByDiscussionId, createResponse, updateResponse, deleteResponse} = require('../controllers/discussionResponseController');

router.get('/discussions', getDiscussions);
router.post('/discussion', createDiscussion); 
router.get('/discussion/:id', getDiscussionById);
router.put('/discussion/:id', updateDiscussion);
router.delete('/discussion/:id', deleteDiscussion);

router.get('/response', getResponses);
router.get('/discussion/response', getResponsesByDiscussionId);
router.post('/response', createResponse);
router.put('/response/:id', updateResponse);
router.delete('/response/:id', deleteResponse);

// const createDiscussionTest = (req, res) => {
//   console.log("=================================");
//   createDiscussion(req, res);
//   console.log("=================================");
//   getDiscussionTest(req, res);
// }



module.exports = router;