#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var _ = require('underscore')._


if (_.isUndefined(argv.hostname)) {
  console.log("Need a hostname");
  process.exit(1);
}



function listDashboards() {

  var request = require('request');

  var options = {
    url: 'http://' + argv.hostname + ':9400/api/group/',
    json: true,  }

  console.log(options.url)
  request.get(
      options,
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
              console.log(body)
          } else {
            console.log("Error: " + response.statusCode)
          }
      }
  );

}

listDashboards();
