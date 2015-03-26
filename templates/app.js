var express = require('express');
var routes = require('./routes');
var app = express();
<% if (includeFrontend) { 
%>var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
<% } %>
app.use(routes);

app.listen(3333, function() {
  console.log('listening to port 3333');
});
