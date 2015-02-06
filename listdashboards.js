#!/usr/bin/env node

var request = require('request');
var argv = require('minimist')(process.argv.slice(2));
var _ = require('underscore')._


if (_.isUndefined(argv.hostname)) {
  console.log("Need a hostname");
  process.exit(1);
}


function listDashboards(groupid) {

  var options = {
    url: 'http://' + argv.hostname + ':9400/api/group/' + groupid + '/dashboard/',
    json: true,  }

  request.get(
      options,
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
             _.each(body, function(dash) {
              console.log("dashid ==", dash.id, "groupid ==", dash.group, "url ==", dash.url)
             });

          } else {
            console.log("Error: " + response.statusCode)
          }
      }
  );
}


function listGroups() {

  var options = {
    url: 'http://' + argv.hostname + ':9400/api/group/',
    json: true,  }

  request.get(
      options,
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
              _.each(body, function(group) {
                listDashboards(group.id);
              });
          } else {
            console.log("Error: " + response.statusCode)
          }
      }
  );

}

listGroups();
