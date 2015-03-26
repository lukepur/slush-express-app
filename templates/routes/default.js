var router = require('express').Router();
<% if (includeFrontend) { %>
router.get('/', function (req, res) {
  res.render('pages/index', {
    title: '<%= name %>',
    tagline: 'Message from a partial'
  });
});
<% } else { %>
router.get('/', function(req, res) {
  res.send('We are building an API - please check back soon.');
});
<% } %>
module.exports = router;
