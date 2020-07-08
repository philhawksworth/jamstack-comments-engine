var axios = require("axios");

// populate environment variables locally.
require('dotenv').config()
const {
  SLACK_WEBHOOK_URL,
  URL
} = process.env;


/*
  Our serverless function handler
*/
export function handler(event, context, callback) {

  // get the arguments from the notification
  var body = JSON.parse(event.body);

  // prepare call to the Slack API
  var slackPayload = {
    "text": "New comment on " + URL,
	  "attachments": [
      {
        "fallback": "New comment on the comment example site",
        "color": "#444",
        "author_name": body.data.email,
        "title": body.data.path,
        "title_link": URL + body.data.path,
        "text": body.data.comment
      },
      {
        "fallback": "Manage comments on " + URL,
        "callback_id": "comment-action",
        "actions": [
          {
            "type": "button",
            "text": "Approve comment",
            "name": "approve",
            "value": body.id
          },
          {
            "type": "button",
            "style": "danger",
            "text": "Delete comment",
            "name": "delete",
            "value": body.id
          }
        ]
      }]
    };

    // post the notification to Slack
    let msg;
    axios.post(SLACK_WEBHOOK_URL, slackPayload)
    .then(function(response){
      msg = 'Post to Slack successful!  Server responded with:' + body;
    })
    .catch(function(error){
      msg = 'Post to Slack failed:' + err;
    })
    .finally(function(){
      console.log(msg);
      callback(null, {
        statusCode: 200,
        body: msg
      })
    });


}
