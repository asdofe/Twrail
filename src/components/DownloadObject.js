var http = require('http');
const cheerio = require('cheerio');
var api_src = '163.29.3.98';
var print = console.log;
var options = {
  host: api_src,
  port: 80,
  path: '/json/'
};
var fs = require('fs');
var download_railway_table = function(path)
{
    options.path = path;
    print('path: ' + path);
    http.get(options, function(res){
        var tmp_name = path.replace(/\//g, '');
        print(tmp_name);
        var file = fs.createWriteStream(tmp_name);
        res.pipe(file);
    }).on('error', function(e){
        console.log('[error]Download json file error: ' + e.message);
    });
};

http.get(options, function(res) {
  console.log("Got response: " + res.statusCode);
  res.on("data", function(chunk) {
    //console.log("BODY: " + chunk);
    const $ = cheerio.load(chunk);
    target_link = $('pre a');
    var flag = 0;
    $(target_link).each(function(i, link){
        var s= $(this).attr('href');
        if(s.indexOf('zip') > -1 && flag == 0)
        {
            flag = 1;
            download_railway_table(s);
            print(s + '\n');
        }

 
    });
  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});



