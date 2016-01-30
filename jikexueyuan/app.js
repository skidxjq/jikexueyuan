var express = require('express');
var cheerio = require('cheerio');
var sleep = require('sleep');
var moment = require('moment');
var Promise = this.Promise || require('promise');
var config = require('./config');
//var superagent = require('superagent');
var superagent = require('superagent-promise')(require('superagent'), Promise);
var wallet = require("./wallet");

//var cookieStr = 'stat_uuid=1447843550593481637817; Hm_lvt_f3c68d41bda15331608595c98e9c3915=1448277376,1448726298,1448726346,1448938974; undefined=; _ga=GA1.2.1631612334.1447843543; stat_ssid=1449729040475; stat_isNew=0; uname=qq_iv3oa60m; uid=4427301; code=URNX3F; authcode=9b74fdNw0nhc5FMcu76WOxoFGQGsc%2B2EM6r%2Bq5uzRq4oHHOubi94LfETV%2FkAEJze0sKLydlgvXdBIdN5cXuE7Dz4F7jkKOvZFDUQ%2F2A46d69dohkEubjB0Nyy%2BkL9lo; level_id=3; is_expire=0; domain=skidxjq; laravel_session=eyJpdiI6Im54NHl6WGhJQldBa1MrbER5MmYxTWc9PSIsInZhbHVlIjoiRmNiNDh5SUcxNEVPcTJcL25NVGx3VFNyT0RoWE1kekJzeTBrd0xMVTRsVERrMHdBTktMalBmd0NFdFhVMjlHZENNSUhBRzBmU1pMUlhKZ1lhR2t4S01RPT0iLCJtYWMiOiJlMTIxN2I0ZmNmNDg4YzVhNTAwZDJjZTU3YThiYTQ3OTNhZmU0NjY3ZWQ3YjE0Y2FmZTVjODFmYTIzZmFhYzYwIn0%3D; QINGCLOUDELB=2377a0539de61b7d01052585200c71bcd562b81daa2a899c46d3a1e304c7eb2b|VmI87|VmI8z';

//var token = 'kIeDMgVCoSfbfXTpLSnHnf0MxB6huGJYxI0f8Oip';
var app = express();
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/filter',function(req, res, next){
    filter(req, res, next);

});

//查看赚了多少
app.get('/earnings', function(req, res, next){
    wallet(req, res, next);

});

//app.get('/', function (req, res, next) {
app.get('/:start/:end/:word', function (req, res, next) {
    console.log(config);
    var items = [];
    //console.log()
    var start = req.params.start, end = req.params.end, word = req.params.word;
    console.log(req.params.start,req.params.end,word);
    for(var i=start;i<end;i++){
        //for(var i=1;i<2000;i++){
        (function(i){
            superagent.get('http://fuwu.jikexueyuan.com/homework/'+i)
                .set('Cookie',config.cookieStr)
                .end(function (err, sres) {
                    //console.log(this);
                    if (!err) {
                        //return next(err);
                        var $ = cheerio.load(sres.text);
                        if(typeof $("h4")[0]!="undefined"){
                            if(word == "abc"){
                                //console.log($("h4")[0].children[0].data ,"=> ", i);
                                //console.log($("div.pull-right")[0].children[0].next.next);
                                items.push({
                                    id : i,
                                    title : $("h4")[0].children[0].data
                                    //datetime:$(".")
                                });
                                items.sort(function (x, y) {
                                    return x.id > y.id ? 1 : -1;
                                });
                                // if(items.length>50){
                                    console.log(items);
                                // }
                            }else if($("h4")[1].children[0].data.indexOf(word)>0)
                            //console.log($("h4")[1]);
                                console.log($("h4")[0].children[0].data ,"=> ", i);

                        }else{
                            //console.log("error ",i,sres.text);
                        }

                    }
                    //console.log(sres.text);

                });
        })(i);

    }
});


function getList(i){
    superagent.get('http://fuwu.jikexueyuan.com/homework/'+i)
        .set('Cookie',cookieStr)
        .end(function (err, sres) {
            if (!err) {
                var $ = cheerio.load(sres.text);
                if(($("h4")[1].hasOwnProperty('children'))){
                    console.log($("h4")[1].children[0].data ,"=> ", i);
                }
                sleep(2);
            }
        })
        .then(getList(++i));
}

function take(){
    var items = [];
    //sleep.sleep(2);
    //setInterval(function(){
    superagent.get('http://fuwu.jikexueyuan.com/homework/not-corrected')
        .set('Cookie', cookieStr)
        .end(function (err, sres) {
            if (err)
                return next(err);
            setTimeout(function(){
                postHomework(sres);
            },2000);
            sleep.sleep(3);
            process.stdout.write('\x08')
        })
        .then(take);
}

function postHomework(sres){
    var $ = cheerio.load(sres.text);
    var trArr = $("tr");

    console.log("#################当前作业数目", trArr.length-1,"###",moment().format());

    trArr.each(function (idx, element) {
        var obj = {
            id: element.children[1].children[0].data,
            price: element.children[15].children[0].data,
            title: element.children[9].children[0].data
        };
        if (
            obj.price > 15
            ||obj.title.indexOf("less") > 0
            ||obj.title.indexOf("面试") > 0
            ||obj.title.indexOf("fis") > 0
            ||obj.title.indexOf("GitHub") > 0
        ) {
            //setTimeout(function(){
            superagent.post('http://fuwu.jikexueyuan.com/homework/take-homework')
                .set('Cookie', cookieStr)
                .set('X-CSRF-TOKEN', token)
                .set('X-Requested-With', 'XMLHttpRequest')
                .send({id: obj.id})
                .end(function (err, sres) {
                    console.log(sres.body);
                    if(sres.error == 500){

                    }
                });
            //},2000);

        }
    })
}


function filter(req, res, next){
    var term = "less";
    var items=[];


    superagent.get('http://fuwu.jikexueyuan.com/homework/10000')
        .set('Cookie',cookieStr)
        .end(function (err, sres) {
            //console.log(this);
            if (err) {
                return next(err);

            }else{
                var $ = cheerio.load(sres.text);
                //console.log(sres.text);

                //if($("h4")[0].children[0].data.indexOf("less") > 0){
                console.log($("h4")[0].children[0].data ,"=> ");
                //items.push({
                //    id : i,
                //    title : $("h4")[0].children[0].data
                //})
                //}
            }

        })
    ;


    //for(var i=13900;i<15988;i++){
    //    (function(i){
    //        superagent.get('http://fuwu.jikexueyuan.com/homework/'+i)
    //            .set('Cookie',cookieStr)
    //            .end(function (err, sres) {
    //                //console.log(this);
    //                if (err) {
    //                    return next(err);
    //
    //                }else{
    //                    var $ = cheerio.load(sres.text);
    //                    console.log(sres.text);
    //
    //                    //if($("h4")[0].children[0].data.indexOf("less") > 0){
    //                    //    console.log($("h4")[0].children[0].data ,"=> ", i);
    //                    //    items.push({
    //                    //        id : i,
    //                    //        title : $("h4")[0].children[0].data
    //                    //    })
    //                    //}
    //                }
    //
    //            });
    //    })(i);
    //}
}

app.listen(3000, function () {
    //take();
    //getList(1);
    console.log('app is listening at port 3000');
});
