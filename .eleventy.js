module.exports = function(config) {

  // Add a date formatter filter to Nunjucks
  config.addFilter("dateDisplay", require("./src/filters/dates.js") );

  // More useful markdown inclusions

  const markdownIt = require("markdown-it");
  const md = new markdownIt({
    html: true
  });
  config.addFilter("markdown", (content) => {
    return md.render(content);
  });



  const Terser = require("terser");
  config.addFilter("jsmin", function(code) {
      let minified = Terser.minify(code);
      if( minified.error ) {
          console.log("Terser error: ", minified.error);
          return code;
      }
      return minified.code;
  });


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
