const axios = require('axios');

// populate environment variables locally.
require('dotenv').config()
const {
  NETLIFY_AUTH_TOKEN,
  URL
} = process.env;


/*
  delete this submission via the api
*/
function purgeComment(id) {
  axios.delete(`https://api.netlify.com/api/v1/submissions/${id}?access_token=${NETLIFY_AUTH_TOKEN}`)
    .then(function(){
      console.log("Comment deleted from queue.");
    })
    .catch(function(error){
      console.log(err);
    });
}


/*
  Handle the lambda invocation
*/
export function handler(event, context, callback) {

  // parse the payload
  var body = event.body.split("payload=")[1];
  var payload = JSON.parse(unescape(body));
  var method = payload.actions[0].name
  var id = payload.actions[0].value

  if(method == "delete") {
    purgeComment(id);
    callback(null, {
      statusCode: 200,
      body: "Comment deleted"
    });
  }
  else if (method == "approve") {

    // get the comment data from the queue
    axios.get(`https://api.netlify.com/api/v1/submissions/${id}?access_token=${NETLIFY_AUTH_TOKEN}`)
      .then(function(response){

        console.log('get submission response :>> ', response);

        // now we have the data, let's massage it and post it to the approved form
        var data = response;
        var payload = {
          'form-name' : "approved-comments",
          'path': data.path,
          'received': new Date().toString(),
          'email': data.email,
          'name': data.name,
          'comment': data.comment
        };

        console.log("Posting to", URL);
        console.log(payload);

        // post the comment to the approved lost
        axios.post(URL, payload)
          .then(function () {
            msg = 'Post to approved comments list successful.'
            console.log(msg);
            purgeComment(id);
          })
          .catch(function (error) {
            msg = 'Post to approved comments failed:' + error;
            console.log(msg);
          });

      })
      .catch(function (error) {
        console.log("Failed to get submission data");
        console.log(error);
      })

    }
  }
