var gulp        = require("gulp");
var sass        = require("gulp-sass");
var serve       = require('gulp-serve');
var shell       = require('gulp-shell');
var clean       = require('gulp-clean');
var runSequence = require('run-sequence');
var gravatar    = require('gravatar');
var request     = require("request");
var fs          = require('fs');
var concat      = require('gulp-concat');
var config      = require('dotenv').config()


/*
  what goes where?
*/
var buildSrc = "src";
var buildDest = "dist";



/*
  cleanup the build output
*/
gulp.task('clean-build', function () {
  return gulp.src(buildDest, {read: false})
    .pipe(clean());
});



/*
  local webserver for development
*/
gulp.task('serve', serve({
  root: [buildDest],
  port: 8008,
}));



/*
  Compile SCSS files to CSS
*/
gulp.task("scss", function () {
  return gulp.src(buildSrc + "/scss/main.scss")
    .pipe(sass({
      outputStyle: "compressed"
    }).on('error', sass.logError))
    .pipe(gulp.dest(buildDest + "/css"))
});



/*
  simplest possible noddy js management
*/
gulp.task("js", function () {
  return gulp.src(buildSrc + "/js/**/*.js")
    .pipe(concat('jamstack-comments.js'))
    .pipe(gulp.dest(buildDest + '/js'))
});



/*
  Check if we need to help the developer setup the Netlify environment variables
*/
gulp.task('check-init', function () {

  // Automatically detect and set the comments queue form environment variable.
  var siteDomain = process.env.URL.split("://")[1];
  var url = `https://api.netlify.com/api/v1/sites/${siteDomain}/forms/?access_token=${process.env.API_AUTH}`;
  console.log("LOOKING FOR FORMS FROM: ", url);

  // Go and get the data from Netlify's submissions API
  request(url, function(err, response, body){
    if(!err && response.statusCode === 200){
      var body = JSON.parse(body);
      console.log("FORMS: ", body);
    } else {
      console.log("Couldn't get comments from Netlify");
    }
  });


  // Look for the environment variables
  if(process.env.QUEUED_COMMENTS_FORM_ID && process.env.API_AUTH && process.env.SLACK_WEBHOOK_URL ) {
    console.log("Required ENV VARS found.");
    var initStatus = {"environment" : true};
  } else {
    console.log("Required ENV VARS missing.");
    var initStatus = {"environment" : false};
  }

  // add the root URL being used in this enviromment
  initStatus['rootURL'] = process.env.URL;

  // save the status of our environment somewhere that our SSG can access it
  fs.writeFile(buildSrc + "/site/_data/init.json", JSON.stringify(initStatus), function(err) {
    if(err) {
      console.log(err);
    }
  });

});



/*
 Run our static site generator to build the pages
*/
gulp.task('generate', shell.task('eleventy --config=eleventy.js'));




/*
  Collect and stash comments for the build
*/
gulp.task("get:comments", function () {

  // set up our request with appropriate auth token and Form ID
  var url = `https://api.netlify.com/api/v1/forms/${process.env.QUEUED_COMMENTS_FORM_ID}/submissions/?access_token=${process.env.API_AUTH}`;

  // Go and get the data from Netlify's submissions API
  request(url, function(err, response, body){
    if(!err && response.statusCode === 200){
      var body = JSON.parse(body);
      var comments = {};

      // massage the data into the shape we want,
      // and add a gravatar URL if possible
      for(var item in body){
        var data = body[item].data;
        var comment = {
          name: data.name,
          avatar: gravatar.url(data.email, {s: '100', r: 'x', d: 'retro'}, true),
          comment: "\n" + data.comment, // add a newline before the markdown so that 11ty can spot the markdown and interpret it.
          date: body[item].created_at
        };

        // Add it to an existing array or create a new one
        if(comments[data.path]){
          comments[data.path].push(comment);
        } else {
          comments[data.path] = [comment];
        }
      }

      // write our data to a file where our site generator can get it.
      fs.writeFile(buildSrc + "/site/_data/comments.json", JSON.stringify(comments, null, 2), function(err) {
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



/*
  Watch src folder for changes
*/
gulp.task("watch", function () {
  gulp.watch(buildSrc + "/**/*", ["build:local"])
});



/*
  Let's build this sucker for production
*/
gulp.task('build', function(callback) {
  runSequence(
    ['clean-build','check-init', 'get:comments'],
    ['generate'],
    ['scss', 'js'],
    callback
  );
});



/*
  Let's build this for local development
*/
gulp.task('build:local', function(callback) {
  runSequence(
    ['clean-build'],
    ['generate'],
    ['scss', 'js'],
    callback
  );
});
