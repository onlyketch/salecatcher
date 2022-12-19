var gulp = require('gulp'),
	sass = require('gulp-sass')(require('sass')),
	cssnano = require('gulp-cssnano'),
	concat = require('gulp-concat'), 
	//uglify = require('gulp-uglify'),
	//webp = require('gulp-webp'),
	//imagemin = require('gulp-imagemin'),
	//imageminPngquant = require('imagemin-pngquant'),
	//mozJPEG = require('imagemin-mozjpeg'),
	browserSync = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
	del = require('del'),
	//webpHTML = require('gulp-webp-html'),
	svgSprite = require('gulp-svg-sprite'),
	ttf2woff = require('gulp-ttf2woff'),
	ttf2woff2 = require('gulp-ttf2woff2'),
	cache = require('gulp-cache');


gulp.task('cleanImg', function() {
	return del('dist/*.{jpg,png,gif}')
});	

gulp.task('sass', function() {
	return gulp.src('source/css/style.scss')
		.pipe(sass())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		//.pipe(cssnano())
		.pipe(gulp.dest('dist/css/'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function() {
	return gulp.src(['source/js/crafty-min.js', 'source/js/mainscene.js', 'source/js/main.js'])
		.pipe(concat('main.js'))
		//.pipe(uglify())
		.pipe(gulp.dest('dist/js/'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('img', function() {
	return gulp.src('source/images/**/*.+(jpg|png)')
		.pipe(gulp.dest('dist/images'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('html', function() {
	return gulp.src('source/**/*.html')
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function() {
	browserSync({ 
		server: { 
			baseDir: 'dist' 
		},
		notify: false
	});
});

gulp.task('svgSprite', function() {
	return gulp.src('source/icons/*.svg')
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: "icons.svg"
				}
			},
		}))
		.pipe(gulp.dest('dist/icons'))
});

gulp.task('fonts', function() {
	gulp.src('source/fonts/*.ttf')
		.pipe(ttf2woff())
		.pipe(gulp.dest('dist/fonts'));
	return gulp.src('source/fonts/*.ttf')
		.pipe(ttf2woff2())
		.pipe(gulp.dest('dist/fonts'));
})

gulp.task('watch', function() {
	gulp.watch('source/css/**/*.scss', gulp.parallel('sass'));
	gulp.watch('source/js/**/*.js', gulp.parallel('js'));
	gulp.watch('source/**/*.html', gulp.parallel('html'));
	gulp.watch('source/images/*.{jpg,png}', gulp.parallel('cleanImg', 'img'));
});

gulp.task('default', gulp.parallel('sass', 'js', 'img', 'html', 'browser-sync', 'watch'));