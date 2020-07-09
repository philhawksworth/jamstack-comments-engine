const fs      = require('fs');
const fetch   = require('node-fetch');
const chalk   = require('chalk');


// gather our environment variables
require('dotenv').config()
const {
  NETLIFY_AUTH_TOKEN
} = process.env;

let formIDs = {};


const getFormSubmissions = async function(formName, path) {
  let formID = formIDs[formName];
  const submissions = await fetch(`https://api.netlify.com/api/v1/forms/${formID}/submissions?access_token=${NETLIFY_AUTH_TOKEN}`).then(res => res.json());
  await fs.writeFileSync(path, JSON.stringify(submissions));
  console.log('Form submissions data saved:', chalk.yellow(path));
};


module.exports = {

  async onPreBuild({ inputs, utils, constants }) {

    // get info about what forms exist on the site
    const forms = await fetch(`https://api.netlify.com/api/v1/sites/${constants.SITE_ID}/forms?access_token=${NETLIFY_AUTH_TOKEN}`).then(res => res.json());

    // build an index object of the form names and their IDs
    console.log(chalk.blue(`${forms.length} forms found in the site:`));
    forms.forEach(form => {
      console.log(chalk.blue(form.name), `(${form.id})` );
      formIDs[form.name] = form.id;
    });


    // get submissions to specified forms or all forms?
    const chosenForms = inputs.formNames == 'ALL' ? Object.keys(formIDs) : [].concat(inputs.formNames)

    // get submissions to each form in parallel
    const promises = chosenForms.map((formName) => {
      const dataFilePath = `${inputs.dataDirectory}/${formName}_submissions.json`;
      return getFormSubmissions(formName, dataFilePath)
    });
    await Promise.all(promises);


  }
}
