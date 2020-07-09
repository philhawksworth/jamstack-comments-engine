const fs      = require('fs');
const fetch   = require('node-fetch');
const chalk   = require('chalk');


// gather our environment variables
require('dotenv').config()
const {
  NETLIFY_AUTH_TOKEN
} = process.env;


module.exports = {

  async onPreBuild({ inputs, utils, constants }) {

    // get info about what forms exist on the site
    const forms = await fetch(`https://api.netlify.com/api/v1/sites/${constants.SITE_ID}/forms?access_token=${NETLIFY_AUTH_TOKEN}`).then(res => res.json());
    console.log(chalk.blue(`${forms.length} forms found in the site:`));

    // build a map of the form names and their IDs
    let formIDs = {};
    forms.forEach(form => {
      console.log(chalk.blue(form.name), `(${form.id})` );
      formIDs[form.name] = form.id;
    });


    // get submissions to specified forms or all forms?
    const chosenForms = inputs.formNames;

    // if all, fetch ids of all forms for this site
    let id = formIDs[chosenForms];

    console.log('fetch :>> ', chosenForms, id);

    const submissions = await fetch(`https://api.netlify.com/api/v1/forms/${id}/submissions?access_token=${NETLIFY_AUTH_TOKEN}`).then(res => res.json());
    const dataFilePath = `${inputs.dataDirectory}/${chosenForms}_submissions.json`;
    await fs.writeFileSync(dataFilePath, JSON.stringify(submissions));
    console.log('Form submissions data saved: ', chalk.yellow(dataFilePath));


  }
}
