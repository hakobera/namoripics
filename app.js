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

app.get('/search/:user/:page', function(req, res, next) {
  var usr = req.params['user'],
      page = req.params['page'];
  console.log(usr);
  twitpics.search(usr, page, function(err, images) {
    if (err) {
      next(err)
    } else {
      res.send({ images: images });
    }
  });
});

//twitpics.load(namori);

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
