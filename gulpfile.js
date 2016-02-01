"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //Open a URL in a web browser
var browserify = require('browserify'); // Bundles JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); //Concatenates files
var lint = require('gulp-eslint'); //Lint JS files, including JSX
var uglify = require('gulp-uglify'); // This is intended only for production
var buffer = require('vinyl-buffer'); // Required to convert file object to buffer, so gulp-uglify can work on it
var watchify = require('watchify');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('babelify');

var config = {
    port: 8081,
    devBaseUrl: 'http://localhost',
	paths: {
		html: './src/main/resources/dev_public/*.html',
		js: [
		       './src/main/resources/dev_public/**/*.js',
		       './src/main/resources/dev_public/**/*.jsx'
		    ],
		images: './src/main/resources/dev_public/images/*',
		css: [
      		'node_modules/bootstrap/dist/css/bootstrap.min.css',
      		'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
					'node_modules/toastr/build/toastr.css',
					'node_modules/font-awesome/font-awesome.css',
          './src/main/resources/dev_public/css/*.css'
    	],
		dist: './src/main/resources/public',
		mainJs: './src/main/resources/dev_public/js/main.js'
	}
}

//Start a local development server
gulp.task('connect', function() {
  connect.server({
    root: [config.paths.dist],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true
  });
});

gulp.task('open', ['connect'], function() {
  gulp.src(config.paths.dist+'/index.html')
    .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist));
  copyToEclipseBin();
});

// We need the files in ./bin folder so that Tomcat can read them
var copyToEclipseBin = function() {
  gulp.src(['./src/main/resources/public/**/*']).pipe(gulp.dest('./bin/public'));
};

gulp.task('js', function() {

  var bundler = watchify(browserify(config.paths.mainJs, { debug: true }).transform(babel));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('build.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(config.paths.dist + '/js'));
    copyToEclipseBin();
  }

  rebundle();

  return bundler
  .on('update', function () { // When any files update
      var updateStart = Date.now();
      rebundle();
      //connect.reload();
      console.log('Updated!', (Date.now() - updateStart) + 'ms');
  })

/*	browserify(config.paths.mainJs)
		//.transform(reactify)
	  .transform(babel())
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
//		.pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
//		.pipe(uglify()) // now gulp-uglify works
		.pipe(gulp.dest(config.paths.dist + '/js'));*/
});

/*
gulp.task('minify', function() {
	return gulp.src(config.paths.dist + '/scripts/*.js')
	 .pipe(uglify())
	 .pipe(gulp.dest('dist-minified'));
});
*/

gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'));
		//.pipe(connect.reload());
  copyToEclipseBin();
});

// Migrates images to dist folder
// Note that I could even optimize my images here
gulp.task('images', function () {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'));
        //.pipe(connect.reload());

    //publish favicon
    gulp.src('./src/favicon.ico')
        .pipe(gulp.dest(config.paths.dist));
        //.pipe(connect.reload());
    copyToEclipseBin();
});

gulp.task('lint', function() {
	return gulp.src(config.paths.js)
		.pipe(lint({config: 'eslint.config.json'}))
		.pipe(lint.format());
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.css, ['css']);
	//gulp.watch(config.paths.js, ['lint']);
});

gulp.task('default', ['html', 'js', 'css', 'images', 'lint', /*'open',*/ 'watch']);
