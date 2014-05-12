var gulp = require('gulp');
var jade = require('gulp-jade');

gulp.task('default', function() {

    gulp.src('./views/jade/*.jade')
        .pipe(jade({
            debug: true
        }))
        .pipe(gulp.dest('./views/html'))
});
