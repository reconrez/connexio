var express = require('express');
var router = express.Router();


/* GET users listing. */
router.post('/userProfile', function(req, res, next) {
    console.log(req.body);
});

module.exports = router;
