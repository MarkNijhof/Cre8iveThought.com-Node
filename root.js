
var express = require('express');
var clientexpress = require('clientexpress');

var express = require("express");
var server = express();
var cons = require('consolidate');

clientexpress.attach(server);

server.configure(function(){
  server.use(express.logger());
  server.use(express.methodOverride());
  server.use(express.bodyParser());
  server.use(express.cookieParser());
  server.use(express.session({ secret: "secret key"}));
  server.use(express.static(__dirname));
  server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  server.use(server.router);

  server.engine('html', cons.hogan);
  server.set('view engine', 'html');
  server.set('view options',{layout:true});
  server.set('views', __dirname + '/views/');
});
                      
server.get('/', function(request, response) {
  response.sendfile('index.html');
});

server.use('/blog', require(__dirname + '/blog').routing());

server.listen(process.env.PORT || 3000);
