

server.configure(function() {
  server.use(express.setTitle({ titleArgument: 'title' }));
  server.use(express.googleAnalytics());
  server.use(express.setContentElement("content"));
});

server.before('*', function(request, response, args, content_element, next) {
//  args.locals.source = 'client';
//  $(content_element).animate({width:'toggle'}, 2000, function() { next(); });
  next();
});

server.after('*', function(request, response, args, content_element, next) {
//  $(content_element).animate({width:'toggle'}, 2000, function() { next(); });
  next();
});

