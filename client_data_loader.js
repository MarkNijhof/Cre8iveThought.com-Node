
var data_loader = (function () {

  var getJSON = function(URL, success) {
    var ud = 'json' + (Math.random() * 100).toString().replace(/\./g, '');
    window[ud] = function(o) {
      success(o);
    };
    document.getElementsByTagName('body')[0].appendChild((function() {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = URL + '?callback=' + ud;
      return s;
    })());
  };

  var load = function(json_url, call_back) {
    getJSON(json_url, function(data) {
      call_back(data);
    });
  };

  var load_index_data = function(call_back) {
    data_loader.load('http://data.cre8ivethought.com/blog/,end:15,filter_by:title,summary,date,url,add_trailing_slash_for_disqus', function(index_data) {
      var data = {
        articles: index_data.to(5),
        previous_posts: index_data.from(5),
        archive_years: [{year: '2014'}, {year: '2013'}, {year: '2012'}, {year: '2011'}, {year: '2010'}, {year: '2009'}]
      };
      call_back(data);
    });
  };

  var load_post_data = function(url, call_back) {
    data_loader.load('http://data.cre8ivethought.com/blog/' + url, function(post_data) {
      call_back(post_data);
    });
  };
  
  return {
    load: load,
    load_index_data: load_index_data,
    load_post_data: load_post_data
  }
})();
