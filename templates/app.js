require('dotenv').config();
var express = require('express');
var routes = require('./routes');
<% if (includeMongo) {
%>var models = require('./models');
require('mongoose').connect(process.env.dbUrl);<% } %>
var app = express();
<% if (includeFrontend) { 
%>var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
<% } %>
app.use(routes);

<% if (includeFrontend) {
%>app.use(express.static('build'));<%}%>

app.listen(3333, function() {
  console.log('listening to port 3333');
});
