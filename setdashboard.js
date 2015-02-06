#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var _ = require('underscore')._
var request = require('request');


if (_.isUndefined(argv.hostname)) {
  console.log("Need a hostname");
  process.exit(1);
}


if (_.isUndefined(argv.groupid)) {
  console.log("Need a groupid");
  process.exit(1);
}


if (_.isUndefined(argv.dashid)) {
  console.log("Need a dashid");
  process.exit(1);
}

if (_.isUndefined(argv.url)) {
  console.log("Need a url");
  process.exit(1);
}


function setDashboard(url) {

  var options = {
    url: 'http://' + argv.hostname + ':9400/api/group/' + argv.groupid + '/dashboard/' + argv.dashid,
    json: true,
    form: {
      url: url
    }
  }

  request.put(
      options,
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
              //console.log(body)
          } else {
            console.log("Error: " + response.statusCode)
          }
      }
  );
}


function getCurrentUrl() {
  var options = {
    url: 'http://' + argv.hostname + ':9400/api/group/' + argv.groupid + '/dashboard/',
    json: true,  }


  var url = "";
  request.get(
      options,
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
            url = _.filter(body, function(d) {return d.id == argv.dashid})[0].url;
            console.log(url);

            setDashboard(argv.url);

            if (!_.isUndefined(argv.timeout)) {
              setTimeout(function() {setDashboard(url)}, argv.timeout * 1000)
            }

          } else {
            console.log("Error: " + response.statusCode)
            process.exit(1);
          }
      }
  );

  return url;
}

getCurrentUrl();
