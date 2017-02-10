(function() {
  'use strict';


	var gulp  = require( 'gulp' ),
      connect = require('gulp-connect'),
      del = require('del'),
      gcallback = require('gulp-callback'),
      runSequence = require('run-sequence');

  function clean() {
    return del.sync('www'); 
  }
	function copy() {
    return gulp.src(['assets/**/*','./node_modules/uswds/dist/**/*','./node_modules/bootstrap/dist/**/*']).pipe(gulp.dest('www')); 
  }
  function watch() {
    gulp.watch('assets/**/*', ['copy']);
  }
  function www() {
    connect.server({
      port: 9004,
      host: '0.0.0.0',
      root: 'www',
      livereload: false
    });
  }
  function build(callback) {
		runSequence(
			'clean', 
			//['html', 'js', 'min-css', 'copy', 'www', 'watch'], callback
			['copy', 'www', 'watch'], callback
		)
	};

  gulp.task('clean', clean);
  gulp.task('copy', copy);
  gulp.task('watch', watch);
  gulp.task('www', www);
  gulp.task('build', build);
  gulp.task('default', ['build']);

})();
