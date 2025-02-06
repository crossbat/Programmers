let http = require('http');
let url = require('url');

function start(rt, hd){
  function onReq(req, res){
    let path = url.parse(req.url).pathname;
    let queryData = url.parse(req.url, true).query;
    rt(path, hd, res);
  }
  http.createServer(onReq).listen(8000);
}

exports.start = start;
