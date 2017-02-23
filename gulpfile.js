(function() {
  'use strict';


	var gulp  = require( 'gulp' ),
      connect = require('gulp-connect'),
	    gulpConnectSsi = require('gulp-connect-ssi'),
      del = require('del'),
      gcallback = require('gulp-callback'),
      runSequence = require('run-sequence');

  function clean() {
    return del.sync('www'); 
  }
	function copy() {
    gulp.src([
    	'assets/**/*',
    	'./node_modules/uswds/dist/**/*',
    	'./node_modules/bootstrap/dist/**/*',
    	])
    	.pipe(gulp.dest('www')); 

    gulp.src([
    	'./node_modules/jquery/dist/jquery.min.js'
    	])
    	.pipe(gulp.dest('www/js')); 
  }
  function watch() {
    gulp.watch('assets/**/*', ['copy']);
  }
  function www() {
    connect.server({
      port: 9004,
      host: '0.0.0.0',
      root: 'www',
      livereload: false,
			middleware: function(){
					return [gulpConnectSsi({
							baseDir: __dirname + '/www',
							ext: '.html',
							domain: 'http://0.0.0.0:9004/',
							method: 'readOnLineIfNotExist'  // readOnLine|readLocal|readOnLineIfNotExist|downloadIfNotExist 
					})];
			}
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
