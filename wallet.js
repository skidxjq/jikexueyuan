/**
 * Created by skidxjq on 15/12/12.
 */
var config = require("./config");
var superagent = require('superagent-promise')(require('superagent'), Promise);
var cheerio = require('cheerio');

var earnings = function(req, res, next){
    var items = [];
    superagent.get('http://fuwu.jikexueyuan.com/wallet')
        .set('Cookie', config.cookieStr)
        .end(function (err, sres) {
            if(err){
                console.log(err);
                return false;
            }else{

                var $ = cheerio.load(sres.text);
                //console.log(sres.text);
                var list = $("tr").slice(1);

                //遍历tr
                list.each(function(index, ele){
                    var obj={};
                    obj.id = ele.children[1].children[0].data;
                    obj.time = ele.children[3].children[0].data;
                    obj.price = parseInt(ele.children[7].children[0].data);
                    //obj.title = ele.children[5].children[0].data;
                    title = ele.children[5].children[0].data;
                    if(obj.price > 0 && title.indexOf("奖励") < 0)
                    //    obj.price = obj.price.substr(1,obj.price.length-1);
                        items.push(obj);
                    //console.log(ele.children[1].children[0].data);

                });
                console.log(items);
                res.json(items);
            }

        });
};

//earnings();
module.exports = earnings;
