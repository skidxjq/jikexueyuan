/**
 * Created by skidxjq on 15/12/14.
 */
var config = require('./config');
var cheerio = require('cheerio');

var superagent = require('superagent-promise')(require('superagent'), Promise);

var takeById = function (val){

    // console.log(val);
    superagent.post('http://fuwu.jikexueyuan.com/homework/take-homework')
        // .set('Cookie', config.cookieStr)
        // .set('X-CSRF-TOKEN', config.token)
        // .set('X-Requested-With', 'XMLHttpRequest')
        // .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36')
        // .set('Cookie', config.cookieStr)
        // .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        // .set('Referer', 'http://fuwu.jikexueyuan.com/homework/23988/correct')
        // .set('Origin', 'http://fuwu.jikexueyuan.com')
        //
        // .set('HOST', 'fuwu.jikexueyuan.com')
        .set('Cookie', config.cookieStr)
        .set('X-CSRF-TOKEN', config.token)
        .set('HOST', 'fuwu.jikexueyuan.com')
        .set('Content-Length', 8)
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set('Accept-Encoding', 'gzip, deflate')
        .set('Accept-Language', 'zh-CN,zh;q=0.8,en;q=0.6')
        .set('Accept', 'application/json, text/javascript, */*; q=0.01')
        .set('Referer', 'http://fuwu.jikexueyuan.com/homework/23988/correct')
        .set('Origin', 'http://fuwu.jikexueyuan.com')
        .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36')
        .set('X-Requested-With', 'XMLHttpRequest')

        .send({id: val})
        .end(function(err, sres){
            // console.log("hehe");
            if(err){
                // console.log('error');

            }
            console.log(sres.body);
        })

}
// process.argv.forEach(function (val, index, array) {
//     //console.log(index + ': ' + val);
//     if(!isNaN(val)){
//         takeById(val)
//
//     }
// });
module.exports = takeById;
//takeById();
