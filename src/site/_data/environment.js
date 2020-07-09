// Make it easier for us to provide some UI logic
// based on whether environment variables have been initialised

module.exports = () => {

  const {
    NETLIFY_AUTH_TOKEN,
    SLACK_WEBHOOK_URL,
    SITE_NAME
  } = process.env;

  return {
    ready : NETLIFY_AUTH_TOKEN && SLACK_WEBHOOK_URL ? true : false,
    NETLIFY_AUTH_TOKEN_ready : NETLIFY_AUTH_TOKEN ? true : false,
    SLACK_WEBHOOK_URL_ready : SLACK_WEBHOOK_URL ? true : false,
    SITE_NAME
  }

};
