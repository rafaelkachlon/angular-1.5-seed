// Include gulp
var gulp = require('gulp');
var path = require('path');
// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var sourcemaps = require('gulp-sourcemaps');

// Browser Sync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch("src/**/*.scss", ['sass']);
    gulp.watch("src/**/*.html", ['copy']);
    gulp.watch("src/**/*.js", ["scripts"]);
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
     gulp.src('src/**/*.scss')
        .pipe(concat('styles.css'))
        .pipe(sass())
        .pipe(gulp.dest('dist'));

        browserSync.reload();
});

gulp.task('vendors',function(){
    return gulp.src([
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/angular/angular.js',
        './node_modules/angular-ui-router/release/angular-ui-router.min.js',
        ])
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest('./dist'));
})

gulp.task('copy', function () {
     gulp
      .src('src/index.html')
      .pipe(gulp.dest('dist'));

      browserSync.reload();
});
// Concatenate & Minify JS
gulp.task('scripts',['templates'], function(done) {
     gulp.src(['src/**/*module.js','dist/templates.js','src/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write())
        .pipe(ngAnnotate())
        .pipe(gulp.dest('dist'))
        .pipe(rename('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));

    browserSync.reload();
    done();
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('templates', function () {
  return gulp.src('src/app/**/*.html')
    .pipe(templateCache({
        root: 'src/app',
        standalone:true,
        transformUrl: function(url) {
            return url.replace(path.dirname(url), '.');
        }
    }))
    .pipe(gulp.dest('dist'));
});
// Default Task
gulp.task('default', ['lint', 'sass','scripts', 'copy','vendors','browser-sync']);