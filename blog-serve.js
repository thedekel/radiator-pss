var http = require("http"),
    fs = require("fs"),
    mongo = require("mongodb"),
    sys = require("sys"),
    url = require("url"),
    path = require("path"),
    ejs = require("ejs"),
    disqus = require("./disqus-node/index");

var db = new mongo.Db('rpss-db', new mongo.Server('localhost', 27017, {}), {});

home = function(req,res){
    res.writeHead(200);
    fs.readFile("./home.ejs",function(err,data){
        res.write(ejs.render(data.toString()));
        res.end();
    });
}

post = function(req,res){
    res.writeHead(200);
    fs.readFile("./post.ejs",function(err,data){
        res.write(ejs.render(data.toString()));
        res.end();
    });
}

read = function(req,res){
    res.writeHead(200);
    fs.readFile("./read.ejs",function(err,data){
        res.write(ejs.render(data.toString()));
        res.end();
    });
}
e404 = function(req,res){
    res.writeHead(404);
    fs.readFile("./e404.ejs",function(err,data){
        res.write(ejs.render(data.toString()));
        res.end();
    });
}
var s = http.createServer(function(req,res){
    return route(url.parse(req.url).pathname)(req,res);
});

var route = function(pa){
    urls = {
       "^/$":home,
       "^/home$":home,
       "^/post":post,
       "^/read":read
    }
    for (q in urls){
        if ((new RegExp(q)).test(pa)){
            return urls[q];
        }
    }       
    return e404;
}

s.listen(8000);
