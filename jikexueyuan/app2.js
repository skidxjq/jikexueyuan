var express = require('express');
var cheerio = require('cheerio');
var sleep = require('sleep');
var moment = require('moment');
var Promise = this.Promise || require('promise');
var superagent = require('superagent-promise')(require('superagent'), Promise);
var config = require('./config');
var release = require('./release');
var timeFlag = Date.parse(new Date());
// var callfile = require('child_process');
var takeByCurl = require('./takeByCurl');

console.log(timeFlag);
//var cookieStr = 'stat_uuid=1447843550593481637817; Hm_lvt_f3c68d41bda15331608595c98e9c3915=1448277376,1448726298,1448726346,1448938974; undefined=; _ga=GA1.2.1631612334.1447843543; stat_isNew=0; uname=qq_iv3oa60m; uid=4427301; code=URNX3F; authcode=c5e4WCz5AjrvqUa42SxG8X%2FZS5jKXpU7yVXdtoybSxyfftC12CXw3MAgqbrsAHTi9uTPSoc%2FTUGrzgjrclO82hNplO7PK%2BRZj%2BlqO9%2B%2FhBaxpZ3AduOFt58jHHZg85o; level_id=3; is_expire=0; domain=skidxjq; XSRF-TOKEN=eyJpdiI6ImFXVnIrekZWS2xxNTNiWmc4a0RIY1E9PSIsInZhbHVlIjoiRERGaWxRYlYxNzAxUXVleDNwNW1vMFwvNHlvVkNkMXZhWThmdHVyTG5ST2djK2xBbHlqNXJINFZrck1HQ0hPRmZoa3l6UlJRSWxiSkI2ejZWWDNUMmFRPT0iLCJtYWMiOiI2ZjAyY2EwZDE1MWI4NDE4NGY4MjRhYTU0NTU1Y2M0YjUwMTA4YmUyYTMxZDdiZjlhM2Y0ZWM2NzgxYmIxNzk3In0%3D; laravel_session=eyJpdiI6IjhDZG0zUXV2RUZhVDhcLzgzZVwvblBodz09IiwidmFsdWUiOiJNd0d6ZTI2TzV3OHl0Rk1vRGhiaHMyN3JNaVpESGJKNzlQRld0YU1JN1M1QUpnTldtc1VOVGUxRll2WFFJUWU2SEtCU0psa3BjamIzUE1ER2RVUml6QT09IiwibWFjIjoiYjZmNjhmM2MyMjE5MGQyNjQzMTZiOTA5ZTZkNzUzZGRlNGE1YjgzYjY0NzA4NTlmN2VkMDc1MmFmZjE1ZjM2YyJ9; QINGCLOUDELB=2377a0539de61b7d01052585200c71bcd562b81daa2a899c46d3a1e304c7eb2b|VmQmJ|VmQke';
//var token = '8PzUbSJrR8ggLrvuk0lwUBrTQyVWkwg0KD3aYJwP';

var app = express();

app.get('/filter', function(req, res, next) {
  filter(req, res, next);

});
app.get('/', function(req, res, next) {
  var items = [];
  for (var i = 15837; i < 15929; i++) {
    (function(i) {
      superagent.get('http://fuwu.jikexueyuan.com/homework/' + i)
        .set('Cookie', config.cookieStr)
        .end(function(err, sres) {
          //console.log(this);
          if (err) {
            return next(err);
          }
          var $ = cheerio.load(sres.text);
          console.log($("h4")[0].children[0].data, "=> ", i);
          items.push({
            id: i,
            title: $("h4")[0].children[0].data
          })
        });
    })(i);
  }
});



function take() {
  var items = [];
  //sleep.sleep(2);
  //setInterval(function(){
  superagent.get('http://fuwu.jikexueyuan.com/homework/not-corrected')
    .set('Cookie', config.cookieStr)
    .end(function(err, sres) {
      if (!err) {
        //setTimeout(function(){
        postHomework(sres);
        //},2000);
        sleep.sleep(1);
        //process.stdout.write('\x08')
      }
      //return next(err);


    })
    .then(take);
}

function postHomework(sres) {
  var $ = cheerio.load(sres.text);
  var trArr = $("tr");

  console.log("#################当前作业数目", trArr.length - 1, "###", moment().format());

  trArr.slice(1).each(function(idx, element) {
    // var obj = {
    //     id: element.children[1].children[0].data,
    //     price: element.children[15].children[0].data,
    //     title: element.children[9].children[0].data,
    //     name: element.children[11].children[0].data
    // };
    var obj = {
      id: element.children[1].children[0].data,
      price: element.children[13].children[0].data,
      class: element.children[5].children[0].attribs.title,
      title: element.children[7].children[0].attribs.title,
      name: element.children[9].children[0].data

    };
    // console.log(element.children[5].children[0].attribs.title);
    //if(obj.id == 16121){
    //
    //}else
    if (
      //obj.price > 10
      (
        obj.price > 15 ||
        obj.title.indexOf("less") > 0 || obj.title.indexOf("面试") > 0 || obj.title.indexOf("总结") > 0 || obj.title.indexOf("设计") > 0 || obj.title.indexOf("FIS") > 0 || obj.title.indexOf("数组") > 0 || obj.title.indexOf("分界") > 0 || obj.title.indexOf("本地数据库") > 0
        // ||obj.class.indexOf("师资") > 0
        || obj.title.indexOf("出现最多") > 0 || obj.title.indexOf("GitHub") > 0)
      //&& obj.name.indexOf("郭鑫") <0
      && obj.name.indexOf("赵玲飞") < 0 && obj.name.indexOf("许应") < 0 && obj.title.indexOf("游戏") < 0 && obj.title.indexOf("IE") < 0 && obj.title.indexOf("青岛") < 0
    ) {
      //setTimeout(function(){
      superagent.post('http://fuwu.jikexueyuan.com/homework/take-homework')
        .set('Cookie', config.cookieStr)
        .set('X-CSRF-TOKEN', config.token)
        .set('HOST', 'fuwu.jikexueyuan.com')
        .set('Content-Length', 8)
        .set('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('Accept-Encoding', 'gzip, deflate')
        .set('Accept-Language', 'zh-CN,zh;q=0.8,en;q=0.6')
        .set('Accept', 'application/json, text/javascript, */*; q=0.01')
        .set('Referer', 'http://fuwu.jikexueyuan.com/homework/23988/correct')
        .set('Origin', 'http://fuwu.jikexueyuan.com')
        .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36')
        .set('X-Requested-With', 'XMLHttpRequest')
        .send({
          id: obj.id
        })
        .end(function(err, sres) {
          var errorCode = sres.body.err;
          console.log(new Date());
          // sleep.sleep(2);
          if (errorCode == 0) {
            // 抢单成功
            // 获取并设置当前时间戳
            console.log(sres.body);
            //抢单成功，并报警
            // config.beep();
            timeFlag = Date.parse(new Date());
          } else if (errorCode == 2) {
            console.log("errorcode =2");
            //抢单失败 作业数目到达上限
            //if(Date.parse(ne))
          } else if (errorCode == 500) {
            console.log("errocode ==500");
            console.log("sleep (～～)~zZ (～～)~zZ (～～)~zZ");
            sleep.sleep(50);
          } else {
            console.log("whats the fuck");
          }
          console.log(sres.body, "=>", obj.id);
          //if(sres.body.error === 2){
          //    //release();
          //    //sleep.sleep(5);
          //}
        });
    }
  })
}


function filter(req, res, next) {
  var term = "less";
  var items = [];


  superagent.get('http://fuwu.jikexueyuan.com/homework/10000')
    .set('Cookie', config.cookieStr)
    .end(function(err, sres) {
      //console.log(this);
      if (err) {
        return next(err);

      } else {
        var $ = cheerio.load(sres.text);
        //console.log(sres.text);

        //if($("h4")[0].children[0].data.indexOf("less") > 0){
        console.log($("h4")[0].children[0].data, "=> ");
      }
    });
}



app.listen(4000, function() {
  take();
  console.log('app is listening at port 3000');
});
