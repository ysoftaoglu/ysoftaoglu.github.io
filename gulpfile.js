var gulp = require("gulp"),
	sass = require("gulp-sass"),
	concat = require("gulp-concat"),
	autoPrefixer = require("gulp-autoprefixer"),
	uncss = require('gulp-uncss'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	plumber = require("gulp-plumber");

gulp.task("style", function () {

	gulp.src(['./css/**/*.css', './sass/**/main.sass'])
		.pipe(plumber())
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(concat('style.min.css'))
		.pipe(autoPrefixer())
		.pipe(gulp.dest('./dist/css/'))
		.pipe(reload({ stream: true }));
});

gulp.task("uncss", function () {
	
		gulp.src('dist/css/style.min.css')
			.pipe(uncss({
				html: ['index.html'],
			}))
			.pipe(gulp.dest('./dist/css/'))
	});

gulp.task("html", function () {

	gulp.src("./*.html")
		.pipe(reload({ stream: true }));

});

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: "./"
		}
	});
});

gulp.task("watch", function () {

	gulp.watch("./*.html", ['html']);
	gulp.watch("./sass/**/*.sass", ['style']);
});

gulp.task('default', ['style', 'html', 'browser-sync', 'watch']);