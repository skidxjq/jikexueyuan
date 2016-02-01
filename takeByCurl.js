var process = require('child_process');
// var id=10
function takeByCurl($homeworkname){
  // process.exec("./curl.sh  "+$id);
  // process.exec("say -v Bells '有作业了'");
  process.exec("say  '来作业了 作业名称"+$homeworkname+"'");
}

module.exports = takeByCurl

// test();
