const prettier = require('gulp-prettier');
const changed = require('gulp-changed');
const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer')

// compile pugs
function compilePugs(){
  const DEST = 'dist';
  return gulp.src('./src/pugs/**/*.pug')
    .pipe(changed(DEST, { extension: '.html' }))
    .pipe(pug({
      verbose: true,
    }))
    .pipe(prettier())
    .pipe(gulp.dest(DEST))
}

// compile sass
function compileSass() {
  const DEST = 'dist/styles';
  return gulp.src('./src/styles/**/*.scss',{ extension: '.css' })
    .pipe(changed(DEST))
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(prettier({ singleQuote: true }))
    .pipe(gulp.dest(DEST))
}

function compileJs(){
  const DEST = 'dist/js'
  return gulp.src('src/js/**/*.js')
    .pipe(changed(DEST))
    .pipe(prettier({ singleQuote: true }))
    .pipe(gulp.dest(DEST))
}

// minify images
// zip files


exports.build = gulp.parallel(compileJs,compilePugs, compileSass)
exports.default = function(){
  gulp.watch('src/js/**/*.js',{ ignoreInitial: false } , compileJs)
  gulp.watch('src/pugs/**/*.pug',{ ignoreInitial: false } , compilePugs)
  gulp.watch('./src/styles/**/*.scss',{ ignoreInitial: false } , compileSass)
}