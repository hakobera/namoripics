/**
 * Module dependencies.
 */

var express = require('express')
  , twitpics = require('./lib/twitpics');

var app = module.exports = express.createServer();
var namori = '_namori_';

// Configuration

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/images', function(req, res) {
  twitpics.show(namori, function(images) {
    res.send({ images: images });
  });
});

twitpics.load(namori);

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

var interval = 60 * 5 * 1000;
setInterval(function() {
  twitpics.load(namori);
}, interval);