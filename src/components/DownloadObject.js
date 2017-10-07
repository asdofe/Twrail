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
var AdmZip = require('adm-zip');
var create_dir_if_not_exists = (path)=>{ if(!fs.existsSync(path)){ fs.mkdirSync(path);}};
var download_railway_table = function(path)
{
    return new Promise(function(resolve, reject){
        options.path = path;
	var data = [], dataLen = 0;
        http.get(options, (res)=>{
	   res.on('data', (chunk) =>
           {
               data.push(chunk);
	       dataLen += chunk.length;

	   }).on('end', () =>
	   {
	       var buf = new Buffer(dataLen);
	       for(var i=0, len = data.length, pos = 0; i < len; i++)
	       {
		   data[i].copy(buf, pos);
		   pos += data[i].length;
	       }
	       var zip = new AdmZip(buf);

	       var root_dir = './tmp';
	       create_dir_if_not_exists(root_dir);
	       file_name = /\/\w+\/(\w+)\.zip/g.exec(path);
	       var json_content = zip.readAsText(file_name[1] + '.json');

	       print(json_content);
	       var full_path = root_dir + '/' + file_name[1] + '.json';
	       print(full_path);
	       var file = fs.createWriteStream(full_path);
	       file.write(json_content); 
	       file.on('finish', () => {
		   file.close();
		   resolve();
	       });
	   });
	});
        
    });
};

http.get(options, function(res) {
  console.log("Got response: " + res.statusCode);
  var data = [], dataLen = 0;
  res.on("data", function(chunk) {
    //console.log("BODY: " + chunk);
       data.push(chunk);
       dataLen += chunk.length;
  }).on('end', () => {
    var buf = new Buffer(dataLen);
    for (var i=0, len = data.length, pos = 0; i < len; i++) 
    { 
	data[i].copy(buf, pos); 
	pos += data[i].length; 
    } 
    const $ = cheerio.load(buf);
    target_link = $('pre a');
    print('link num: ' + $(target_link).length);
    $(target_link).each(function(i, link){
        var s= $(this).attr('href');
        if(s.indexOf('zip') > -1) 
        {
            var prom = download_railway_table(s);
        }

      });
  }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
});

