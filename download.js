/**
 * Created by skidxjq on 15/12/14.
 */
var config = require('./config');
var cheerio = require('cheerio');

var superagent = require('superagent-promise')(require('superagent'), Promise);

var downloadById = function (id){

    //console.log(val);
    var suffix = "http://fuwu.jikexueyuan.com/";
    superagent.get('http://fuwu.jikexueyuan.com/homework/'+id)
        .set('Cookie',config.cookieStr)
        .end(function(err, sres){
            //console.log(sres.body);
            if (!err) {
                //return next(err);
                var $ = cheerio.load(sres.text);
                if(typeof $(".btn_download_code")[0]!="undefined"){

                    //下载的相对路径
                    var downloadUrl = $(".btn_download_code")[0].attribs.href;
                    var question  = $(".form-control-static")[1].children[0].data;

                    //console.log(question);
                    //输出绝对路径
                    console.log(suffix+downloadUrl);
                }
            }

        })

}
process.argv.forEach(function (val, index, array) {
    //console.log(index + ': ' + val);
    if(!isNaN(val)){
        downloadById(val)

    }
});

//takeById();
