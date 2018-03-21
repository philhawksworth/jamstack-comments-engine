var gulp      = require("gulp");
var sass      = require("gulp-sass");
var serve     = require('gulp-serve');
var shell     = require('gulp-shell');
var request   = require("request");
var gravatar  = require('gravatar');
var clean     = require('gulp-clean');
var runSequence = require('run-sequence');


// what goes where?
var buildSrc = "src";
var buildDest = "dist";


// cleanup the build output
gulp.task('clean-build', function () {
  return gulp.src(buildDest, {read: false})
    .pipe(clean());
});


// local webserver for development
gulp.task('serve', serve({
  root: [buildDest],
  port: 8008,
}));


// Compile SCSS files to CSS
gulp.task("scss", function () {
  gulp.src(buildSrc + "/scss/main.scss")
    .pipe(sass({
      outputStyle: "compressed"
    }).on('error', sass.logError))
    .pipe(gulp.dest(buildDest + "/css"))
});



// Check if we need to help teh developer setup the environment variables
gulp.task('check-init', function () {
  // console.log("envs", process.env.ROUTES_FORM_ID);
  if(process.env.ROUTES_FORM_ID && process.env.API_AUTH ) {
    console.log("init OK!");
  } else {
    console.log("We need ENV VARS");
  }
});



gulp.task('generate', shell.task('eleventy  --config=eleventy.js'));



// Collect and stash comments for the build
gulp.task("get:comments", function () {

  // set up our request with appropriate auth token and Form ID
  var oauth_token = process.env.NETLIFY_TOKEN;
  var formID = "5a6df445ae52900fdc164e26";
  var url = "https://api.netlify.com/api/v1/forms/" + formID + "/submissions/?access_token=" + oauth_token;

  // Go and get the data from Netlify's submissions API
  request(url, function(err, response, body){
    if(!err && response.statusCode === 200){
      var body = JSON.parse(body);
      var comments = {};
      for(var item in body){
        var data = body[item].data;
        var comment = {
          name: data.name,
          avatar: gravatar.url(data.email, {s: '100', r: 'x', d: 'retro'}, true),
          comment: data.comment,
          date: body[item].created_at
        };
        // Add it to an existing array or create a new one
        if(comments[data.path]){
          comments[data.path].push(comment);
        } else {
          comments[data.path] = [comment];
        }
      }

      // store all of the organised comments in a yaml file keyed by the path for each comment
      var commentFile = "/data/comments.json";

      // if(body.length === 0) {
      //   ymlText = "---"
      //   console.log("No comments :( ");
      // } else {
      //   var ymlText = yaml.stringify(comments);
      //   console.log("There are comments to stash");
      // }

      // write our data to a file where our site generator can get it.
      fs.writeFile(__dirname + commentFile, comments, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("Comments data saved.");
        }
      });

    } else {
      console.log("Couldn't get comments from Netlify");
    }
  });
});



// Watch src folder for changes
gulp.task("watch", ['build'], function () {
  gulp.watch(buildSrc + "/**/*", ["build"])
});



gulp.task('build', function(callback) {
  runSequence(
    ['clean-build','check-init'],  // 'get-comments',
    ['generate', 'scss'],
    callback
  );
});
