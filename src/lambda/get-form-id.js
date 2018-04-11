'use strict';
var request = require("request");

/*
  Once a build has happened, Netlify will have created a Form for us. We want its ID for some setup.
  This function is a little helper to discover that ID so that we can more easily add it as an env variable.
*/
export function handler(event, context, callback) {

  var siteDomain = process.env.URL.split("://")[1];
  var url = `https://api.netlify.com/api/v1/sites/${siteDomain}/forms/?access_token=${process.env.API_AUTH}`;

  // go and get the
  request(url, function(err, response, body){
    if(!err && response.statusCode === 200){
      var body = JSON.parse(body);
      var approvedForm = body.filter(function(f){
        return f.name == 'approved-comments';
      });
      callback(null, {
        statusCode: 200,
        body: `<html><head><title>Approved Form ID</title></head><body>The approved_form_id is: ${approvedForm[0].id}<body></html>`
      })
    } else {
      callback(null, {
        statusCode: 404,
        body: "Couldn't detect a APPROVED_FORM from the API"
      })
    }
  });

}
