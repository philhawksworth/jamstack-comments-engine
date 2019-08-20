module.exports = function(config) {

  // Add a date formatter filter to Nunjucks
  config.addFilter("dateDisplay", require("./filters/dates.js") );


  // eleventy config settings
  return {
    dir: {
      input: "src/site",
      output: "dist",
      includes: "_includes"
    },
    templateFormats : ["njk", "md"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk"
  };
};
