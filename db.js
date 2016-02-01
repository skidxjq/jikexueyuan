var bodyParser = require('body-parser');
//
//// json类型body
//app.use(bodyParser.json());
//// query string类型body
//app.use(bodyParser.urlencoded({
//    extended: false
//})); 

// 静态文件目录

var orm = require("orm");


function conn(){
    orm.connect("mysql://root:@localhost/geek", function(err, db){
        if (err)
            console.log(err);
        console.log(db);
        var Stu = db.define("student", {
            id: Number,
            stuname: String,
            period: String,
            homework: String,
            career: String,
            class: String,
            submitTime: String,
            price: Number,
            keyPoints: String,
            introduction: String,
            instruction: String,
            homeworkExplain: String,
            tips: String,
            standard: String,
            source: String,
            question: String,
            score: Number,
            comment: String,
            correctTime: String,
            correctUrl: String


        });
        var record1 = {
            id: 10,
            stuname: "xiaoming",
            period: "nicai",
            homework: "大变活人",
            career: "web前端",
            class: "三年二班",
            submitTime: "2015-12-10 10:26:45",
            price: 25.00,
            keyPoints: "1.运行nodejs环境代码   2.查看接口api是否运行良好",
            introduction: "http://jiuye-res.jikexueyuan.com/web/tasks/t09_desc.mp4",
            instruction: "http://jiuye-res.jikexueyuan.com/web/tasks/t09_h01_video.mp4",
            homeworkExplain: "把之前的前端百度新闻界面拉过来，后台改成nodejs版本，可以做成express渲染模板形式亦可以做成rest风格api形式搭载mysql,记得导出sql脚本文件。",
            tips: "1.安装express或者rest框架或者nodejs 2.利用Ajax配合请求",
            source: "/Upload/homework/submit/homework_id_79_20151210102645.rar",
            question: '<p class="form-control-static">老师好！<br><br>node_news 文件夹中的 app.js 是新闻页面的入口文件，backstage 文件夹中的 app.js 是后台页面的入口文件。<br>  <br>请老师指教，谢谢！</p>'

        };
        console.log(record1);


        Stu.create(record1, function(err, stu){
            if(err)
                console.log(err);
        })

    })
}

conn();
