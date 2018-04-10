'use strict';
var request = require("request");

/*
  Once a build has happened, Netlify will have created a Form for us. We want its ID for some setup.
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
        body: `approved_form_id ${approvedForm[0].id}`
      })
    } else {
      callback(null, {
        statusCode: 404,
        body: "Couldn't detect a APPROVED_FORM from the API"
      })
    }
  });

}
