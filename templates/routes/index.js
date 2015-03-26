var router = require('express').Router(),
    home = require('./default');

router.use(home);

module.exports = router;
