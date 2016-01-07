var gulp = require('gulp')
var webpack = require('gulp-webpack')
var fs = require('fs')
var uglify = require('gulp-uglify')
var filter = require('gulp-filter')
var clean = require('gulp-clean')
var argv = require('optimist').argv
var livereload = require('gulp-livereload')
var path = require('path')
var htmlmin = require('gulp-htmlmin')
var gulpif = require('gulp-if')
var rev = require('gulp-rev')
var revCollector = require('gulp-rev-collector')
var gulpSequence = require('gulp-sequence').use(gulp)
var replace = require('gulp-replace')
var webpackConfig = require('./webpack.config')
var production = false
if (argv.p) {
    production = true
}
gulp.task('webpack', ['htmls'], function (cb) {
    gulp.src('src')
        .pipe(webpack(webpackConfig))
        .pipe(gulpif(production, uglify()))
        .pipe(gulpif(production, rev()))
        .pipe(gulp.dest('dist/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/'))
        .on('finish', function () {
            gulp.src(['dist/**/*.json', '../views/dist/**/*.xtpl'])
                .pipe(revCollector({
                    replaceReved: true
                }))
                .pipe(gulp.dest('../views/dist/'))
                .on('finish', cb)
        })
})
gulp.task('vendor', function (cb) {
    var unCompressJsFilter = filter('**/dist/**/*.js', {restore: true})
    gulp.src([
        '../../node_modules/{react,react-dom,bootstrap,@alife/amap-web-cms-ui}/dist/**/*.*'])
        .pipe(unCompressJsFilter)
        .pipe(gulpif(production, uglify()))
        .pipe(unCompressJsFilter.restore)
        .pipe(gulp.dest('dist/vendor'))
        .on('finish', cb)
})
gulp.task('htmls', function (cb) {
    gulp.src('../views/src/**/*.xtpl')
        .pipe(gulpif(production, htmlmin({
            collapseWhitespace: true,
            minifyCSS: true
        })))
        .pipe(gulpif(production, replace(/\.min(?=\.(js|css))/g, '')))
        .pipe(gulpif(production, replace(/(dist\/[^">]+)\.js/g, '$1.min.js')))
        .pipe(gulpif(production, replace(/(<link[^>]+)\.css/g, '$1.min.css')))
        .pipe(gulp.dest('../views/dist'))
        .on('finish', cb)
})
gulp.task('clean', function (cb) {
    gulp.src('{dist,../views/dist}', {read: false})
        .pipe(clean({force: true}))
        .on('finish', cb)
})
gulp.task('watch', ['default'], function () {
    //处理未捕获的异常，防止watch退出
    process.on('uncaughtException', function (err) {
        console.log(err.stack)
    })
    livereload({
        start: true
    })
    webpackConfig.watch = true
    gulp.src('src')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('dist/'))
    gulp.watch('{{./,../views/}/dist/**/*.*}', function (event) {
        livereload.changed(path.join(__dirname, event.path))
    })
})
gulp.task('default', function (cb) {
    gulpSequence('clean', 'webpack', ['vendor'], cb)
})
gulp.task('help', function (cb) {
    console.log('gulp:执行构建(开发环境)')
    console.log('gulp watch:开发环境使用，配合livereload可以实现实时刷新页面')
    console.log('gulp -p:执行构建(生产环境)')
    cb()
})
