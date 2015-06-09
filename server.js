var restify = require('restify');
var mongo   = require('mongojs');

var config = require('./config/config');

//assumes you have a local instance of mongodb running default settings.
//run db.createCollection('test') on your mongo console to init.

var db = mongo('local', ['test']);
var server = restify.createServer();

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.listen(config.port, function() {
  console.log("Server started on",config.port);
});

/**
 *
 *  Routes
 *
 */

server.get("/test", function(req, res, next) {
  //res.send("Test");

  // sample db access code.
  //
  db.test.find(function (err, data) {
    res.end(JSON.stringify(data));
  });

  return next();
});

server.post("/test", function(req, res, next) {
  var testBody;
  try {
    testBody = JSON.parse(req.body);

    db.test.save(testBody,
      function (err, data) {
        console.log("err?", err)
        res.end(JSON.stringify(data));
      }
    );
  } catch (e) {
    //write 500
    console.log("Error saving test, ", e);
  }

  return next();
});

