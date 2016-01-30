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
var process = require('child_process');
var takeById = require("./takeById");
var takeByCurl = require('./takeByCurl');

console.log(timeFlag);


var app = express();

app.get('/filter', function(req, res, next) {
  filter(req, res, next);

});


function take() {
  var items = [];
  //sleep.sleep(2);
  //setInterval(function(){
  superagent.get('http://fuwu.jikexueyuan.com/homework/not-corrected')
    .set('Cookie', config.cookieStr)
    .end(function(err, sres) {
      if(sres){
        postHomework(sres);
        //},2000);
        sleep.sleep(1);
      }else{
        console.log("网络异常");
        // process.exec("say -v Bells 'abcdefg'");

      }
      // console.log(sres.status);




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
        obj.title.indexOf("less") > 0 ||
        obj.title.indexOf("面试") > 0 ||
        obj.title.indexOf("总结") > 0 ||
        obj.title.indexOf("设计") > 0 ||
        obj.title.indexOf("FIS") > 0 ||
        obj.title.indexOf("利用Jquery") > 0 ||
        // obj.title.indexOf("hao123") > 0 ||
        obj.title.indexOf("数组") > 0 ||
        obj.title.indexOf("分为界") > 0 ||
        obj.title.indexOf("本地数据库") > 0
        // ||obj.class.indexOf("师资") > 0
        || obj.title.indexOf("出现最多") > 0 || obj.title.indexOf("GitHub") > 0)
      //&& obj.name.indexOf("郭鑫") <0
      && obj.name.indexOf("周寒") < 0
      && obj.name.indexOf("郭鑫") < 0
      && obj.title.indexOf("游戏") < 0 && obj.title.indexOf("IE") < 0 && obj.title.indexOf("青岛") < 0
      // && obj.title.indexOf("游戏") < 0 && obj.title.indexOf("IE") < 0 && obj.title.indexOf("青岛") < 0
    ) {
      // console.log("有作业了！");
      console.log("来作业了！",obj.id,"=>",obj.title);
      takeById(obj.id);
    //   takeByCurl(obj.title);
    }
  })
}





app.listen(4000, function() {
  take();
  console.log('app is listening at port 3000');
});
