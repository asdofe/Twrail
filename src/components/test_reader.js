var fs = require('fs');
var glob = require("glob");
String.prototype.hashCode = function() {
    var hash = 0;
    if (this.length == 0) {
        return hash;
    }
    for (var i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

const time_table_path = 'tmp/*.json';
let options = {};
var insert_row =  ele => {
    var train_id = ele.tid;
    var train_class = ele.train_class;
    var arrive_t = ele.ArrTime;
    var dept_t = ele.DepTime;
    var order = ele.Order;
    var route = ele.Route;
    var station= ele.station;
    var source_hash = ele.hash;
    console.log('tid:'+train_id+',tclass:'+train_class+',arr_t:'+arrive_t+',dept_t:'+dept_t);
};

glob(time_table_path, options, (err, files) => {
    var i = 0;
    files.map(file => {
        if(i <= 0)
        {
           console.log(file);
           fs.readFile(file, 'utf8', (err, data) => {
               if(err){
                   return console.log(err);
               }

               var hash = data.hashCode();
               var single_file;
               try{
	           single_file = JSON.parse(data).TrainInfos;
               }catch(e)
               {
                   console.log('json parse error:' + e);
               }
               var i = 0;
	       single_file.map(single_train => {
                   var train_id = single_train.Train;
                   var train_class = single_train.CarClass;
                   console.log(train_id);
                   single_train.TimeInfos.map(stop_point => {
                       stop_point.tid = train_id;
                       stop_point.hash = hash;
                       stop_point.train_class = train_class;
	               insert_row(stop_point);
                   });
               });

           });
           
        }
        ++ i;
    });
});

