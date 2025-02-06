function route(path, hd, res){
  console.log(`path name = ${path}`);
  if(hd[path]){
    hd[path](res);
  }else{
    hd['/static'](res, path);
  }
}

exports.route = route;
