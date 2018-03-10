var express = require('express'),
     router = express.Router();

router.get('/', function(req, res) {
  req.session.destroy();
    res.cookie('islogin', "", { maxAge: 1 });
  res.redirect('/login');
});

module.exports = router;