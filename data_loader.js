
var http = require('http');
var url = require('url');

exports.load = function(json_url, call_back) {

  var siteUrl = url.parse(json_url);
  var site = http.createClient(siteUrl.port || 80, siteUrl.host);

  var request = site.request("GET", siteUrl.pathname, {'host' : siteUrl.host});
  
  var content = "";

  request.on('response', function(response) {
    response.setEncoding('utf8');

    response.on('data', function(chunk) {
      content += chunk;
    });

    response.on('end', function() {
      call_back(JSON.parse(content));
    });
  });
  
  request.end();
}

exports.load_index_data = function(call_back) {
  data_loader.load('http://data.cre8ivethought.com/blog/,end:15,filter_by:title,summary,date,url,add_trailing_slash_for_disqus', function(index_data) {
    var data = {
      articles: index_data.to(5),
      previous_posts: index_data.from(5),
      archive_years: [{year: '2011'}, {year: '2010'}, {year: '2009'}]
    };
    call_back(data);
  });
}

exports.load_post_data = function(url, call_back) {
  data_loader.load('http://data.cre8ivethought.com/blog/' + url, function(post_data) {
    call_back(post_data);
  });
}