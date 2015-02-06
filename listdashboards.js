#!/usr/bin/env node

var http = require('http');


var options = {
  host: process.argv[2],
  port: 9400,
  path: '/api/group'
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    var groups = JSON.parse(str);
    for(var group in groups) {
        console.log(groups[group].id + " >> " + groups[group].name);
    };
  });
}

http.request(options, callback).end();
