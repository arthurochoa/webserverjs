var http = require('http')
, url = require('url')
, fs = require('fs')
, server;

server = http.createServer(function(req, res){
    // parse the pathname as a url
    var path = url.parse(req.url).pathname;

    switch(path) {
        case '/test' :
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write('It works!\n');
            res.end();

        case '/' :
            // serve up our html chat client file by writing it directly to the response
            fs.readFile(__dirname + '/index.html', function(err, data){
               if (err) return send404(res);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data, 'utf8');
                res.end();
            });
        case '/twitter' :
            // serve up our html chat client file by writing it directly to the response
            fs.readFile(__dirname + '/twitter.html', function(err, data){
                if (err) return send404(res);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data, 'utf8');
                res.end();
            });
        break;

        default: send404(res);
    }
});

send404 = function(res){
    res.writeHead(404);
    res.write('404');
    res.end();
};

server.listen(8080);