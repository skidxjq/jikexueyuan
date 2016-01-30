/**
 * Created by skidxjq on 15/12/7.
 * 根据id抢作业
 */

var superagent = require('superagent-promise')(require('superagent'), Promise);
var cookieStr = 'stat_uuid=1447843550593481637817; Hm_lvt_f3c68d41bda15331608595c98e9c3915=1448277376,1448726298,1448726346,1448938974; undefined=; _ga=GA1.2.1631612334.1447843543; stat_isNew=0; uname=qq_iv3oa60m; uid=4427301; code=URNX3F; authcode=c5e4WCz5AjrvqUa42SxG8X%2FZS5jKXpU7yVXdtoybSxyfftC12CXw3MAgqbrsAHTi9uTPSoc%2FTUGrzgjrclO82hNplO7PK%2BRZj%2BlqO9%2B%2FhBaxpZ3AduOFt58jHHZg85o; level_id=3; is_expire=0; domain=skidxjq; XSRF-TOKEN=eyJpdiI6ImFXVnIrekZWS2xxNTNiWmc4a0RIY1E9PSIsInZhbHVlIjoiRERGaWxRYlYxNzAxUXVleDNwNW1vMFwvNHlvVkNkMXZhWThmdHVyTG5ST2djK2xBbHlqNXJINFZrck1HQ0hPRmZoa3l6UlJRSWxiSkI2ejZWWDNUMmFRPT0iLCJtYWMiOiI2ZjAyY2EwZDE1MWI4NDE4NGY4MjRhYTU0NTU1Y2M0YjUwMTA4YmUyYTMxZDdiZjlhM2Y0ZWM2NzgxYmIxNzk3In0%3D; laravel_session=eyJpdiI6IjhDZG0zUXV2RUZhVDhcLzgzZVwvblBodz09IiwidmFsdWUiOiJNd0d6ZTI2TzV3OHl0Rk1vRGhiaHMyN3JNaVpESGJKNzlQRld0YU1JN1M1QUpnTldtc1VOVGUxRll2WFFJUWU2SEtCU0psa3BjamIzUE1ER2RVUml6QT09IiwibWFjIjoiYjZmNjhmM2MyMjE5MGQyNjQzMTZiOTA5ZTZkNzUzZGRlNGE1YjgzYjY0NzA4NTlmN2VkMDc1MmFmZjE1ZjM2YyJ9; QINGCLOUDELB=2377a0539de61b7d01052585200c71bcd562b81daa2a899c46d3a1e304c7eb2b|VmQmJ|VmQke';
var token = '8PzUbSJrR8ggLrvuk0lwUBrTQyVWkwg0KD3aYJwP';
var postById = function(id){

    superagent.post('http://fuwu.jikexueyuan.com/homework/take-homework')
        .set('Cookie', cookieStr)
        .set('X-CSRF-TOKEN', token)
        .set('X-Requested-With', 'XMLHttpRequest')
        .send({id: id})
        .end(function (err, sres) {
            console.log(sres.body,"=>" , id);
            //if(sres.body.error === 2){
            //    //release();
            //    //sleep.sleep(5);
            //}
        });
};

module.exports = postById
