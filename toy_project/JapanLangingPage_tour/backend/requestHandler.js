//file sync
const fs = require('fs');
//path
const path = require('path')
//html
const main_view = fs.readFileSync('../index.html', 'utf-8');
const error404 = fs.readFileSync('../template/error/error404.html');
//static
function handleStaticFiles(res, filepath){
  const fullpath = path.join('..', filepath);
}

function serveFile(res, filepath){
  const extname = path.extname(filepath);
  const stream = fs.createReadStream(filepath);
  let contentType = 'text/html';
  const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
  };

  contentType = mimeTypes[extname] || 'application/octet-stream';
 
  stream.on('open', () => {
    res.writeHead(200, {'Content-Type' : contentType});
    stream.pipe(res);
  });
  stream.on('error', () => {
    res.write(404, {'Content-Type' : 'text/html'});
    res.end(error404);
  });
}

function main(res){
  res.writeHead(200, {'Content-Type' : 'text/html'});
  res.write(main_view);
  res.end();
}

function favicon(res){
  console.log('favicon');
}

function styles(res){
  serveFile(res, '../static/css/index.css', 'text/css');
}



//handler
let handle = {};
handle['/'] = main;
handle['/static'] = handleStaticFiles;

exports.handle = handle;
