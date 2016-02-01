/**
 * Created by skidxjq on 15/12/16.
 */

var config = require('./config');
var cheerio = require('cheerio');

var superagent = require('superagent-promise')(require('superagent'), Promise);

var correctById = function(obj){
    superagent.post('http://fuwu.jikexueyuan.com/homework/correct')
        .set('Cookie', config.cookieStr)
        .set('X-CSRF-TOKEN', config.token)
        .set('X-Requested-With', 'XMLHttpRequest')
        .send(obj)
        .end(function(err, sres){
            console.log(sres.body);

        })
};


//var jsonbody = {
//    id: 18005,
//    score_1: 16,
//    score_2: 16,
//    score_3: 16,
//    score_4: 16,
//    score_5: 16,
//    teacher_message: "作业的问题。<br>    1、编辑新闻不填写id报错<br>2、图片填写请加入验证<br>3、前台最好有个点击加载更多的增量功能",
//    teacher_video_url:"http://222.197.183.150/cdn/1216/node.mp4"
//};

var jsonbody = {
    id: 18026,
    score_1: 17,
    score_2: 18,
    score_3: 18,
    score_4: 18,
    score_5: 18,
    teacher_message: "一些小问题<br><? echo $token ?>我这打印不出来，最好改成<?php  或者<?=$token=?><br/>其次转移字符从数据库读取展示在input框中的时候，应该再转移回来",
    teacher_video_url:"http://222.197.183.150/cdn/1216/php.mp4"
};

correctById(jsonbody);


