// Make it easier for us to provide some UI logic
// based on whether environment variables have been initialised

module.exports = () => {

  const {
    API_AUTH,
    APPROVED_COMMENTS_FORM_ID,
    SLACK_WEBHOOK_URL,
    SITE_NAME
  } = process.env;

  return {
    ready : API_AUTH && APPROVED_COMMENTS_FORM_ID && SLACK_WEBHOOK_URL ? true : false,
    API_AUTH_ready : API_AUTH ? true : false,
    APPROVED_COMMENTS_FORM_ID_ready : APPROVED_COMMENTS_FORM_ID ? true : false,
    SLACK_WEBHOOK_URL_ready : SLACK_WEBHOOK_URL ? true : false,
    SITE_NAME
  }

};
