var express = require('express');
var router = express.Router();

/* testNej */
router.get('/', function(req, res, next) {
    console.log("This is the testNej page!");
    res.render('testNej', { title: 'TestNej' });
});

module.exports = router;