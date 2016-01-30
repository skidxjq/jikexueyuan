var cheerio = require('cheerio');
var Promise = this.Promise || require('promise');
var superagent = require('superagent-promise')(require('superagent'), Promise);

var config = require('./config');

var obj={};
var release = function(){
    return superagent.get('http://fuwu.jikexueyuan.com/homework/my')

        .set('Cookie',config.cookieStr)
        .end(function (err, sres) {

            if (!err) {
                var $ = cheerio.load(sres.text);
                var trArr = $("tr");

                trArr.slice(1,9).each(function (idx, element) {
                    var obj={
                        id:element.children[1].children[0].data,
                        class:element.children[13].children[0].next.attribs.class
                    };
                    if(obj.class.indexOf("danger") > 0){
                        console.log("release homework ",obj.id)
                        releaseHomework(obj);
                    }

                })

            }
        })
};


var releaseHomework = function(obj){
    superagent.post('http://fuwu.jikexueyuan.com/homework/cancel-correct')

        .set('Cookie', config.cookieStr)
        .set('X-CSRF-TOKEN', config.token)
        .set('X-Requested-With', 'XMLHttpRequest')
        .send({id: obj.id})
        .end(function (err, sres) {

            if(!err){
                console.log(sres.body);
                if(sres.error == 500){

                }
            }
        });
    //},2000);
}

module.exports = release;