
var express = require("express");
  
exports.routing = function() {
  var server = express();

  server.get('/(index)?', function(request, response) {
    data_loader.load_index_data(function(data) {
      data.articles.map(function(post) {
        post.url = post.url.replace('http://cre8ivethought.com', '');
        post.show_updated_date = (typeof post.updated != 'undefined' && post.updated != '' && post.date != post.updated);
        post.description = post.content.length > 100 ? post.content.substring(0, 100) : post.content
      });
      
      data.previous_posts.map(function(post) {
        post.show_updated_date = (typeof post.updated != 'undefined' && post.updated != '' && post.date != post.updated);
      });

      response.render('blog/index.html', data);
    });
  });

  server.get('/ls4d-embeded', function(request, response) {
    response.render('blog/ls4d-embeded.html', {});
  });

 server.get('/*', function(request, response) {
    data_loader.load_post_data(request.params[0], function(data) {
    
      if (data.count() == 0)
      {
        show_not_found(response, request.params[0]);
        return;
      }
    
      if (data.count() == 1)
      {
        show_single_post(response, data.first());
        return;
      }
      
      show_summaries(response, request.params[0], data);
    });
  });


  var show_single_post = function(response, post) {
    post.show_css = (typeof post.css != 'undefined' && post.css != "");
    post.show_disqus = (typeof post.disqus != 'undefined' && post.disqus != "");
    post.show_updated_date = (typeof post.updated != 'undefined' && post.updated != '' && post.date != post.updated);
    post.show_stats = (typeof post.words != 'undefined' && post.words != '');
  
    console.log(post);
  
  	response.layout = 'layouts/layout.html';
    response.render('blog/article.html', post);
  };
  
  var show_summaries = function(response, slug, posts) {
    posts.map(function(post) {
      post.show_updated_date = (typeof post.updated != 'undefined' && post.updated != '' && post.date != post.updated);
    });
  
    response.render('blog/archive.html', {
        posts: posts, 
        slug: slug,
        archive_years: [{year: '2011'}, {year: '2010'}, {year: '2009'}]
      });
  };
  
  var show_not_found = function(response, slug) {
    response.render('404', { 
      slug: slug
    });
  };
  
  return server;
};
