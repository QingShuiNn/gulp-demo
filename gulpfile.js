const gulp = require('gulp')
const babel = require('gulp-babel')
const connect = require('gulp-connect')
const webserver = require('gulp-webserver') // 服务器
const notify = require('gulp-notify') // 提示信息
const less = require('gulp-less') // less
const concat = require('gulp-concat') // 文件合并
const rename = require('gulp-rename') // 文件更名
const uglify = require('gulp-uglify') // js压缩
const minify = require('gulp-minify-css') // css压缩
const rev = require('gulp-rev') // 对文件名加MD5后缀
const revCollector = require('gulp-rev-collector') // 路径替换
const runSequence = require('run-sequence') // 同步执行任务
const zip = require('gulp-zip') // 压缩为.zip文件

// common --- 设置path路径
const path = {
  html: './src/*.html', // html 原文件地址
  js: './src/js/*.js',  // js 原文件地址
  less: './src/css/*.less',  // less 原文件地址
  css: './src/css/*.css', // css 原文件地址
  destJs:'./src/dest/js', // js的合并后的地址
  destCss:'./src/dest/css', // css的合并后的地址
  revJs:'./rev/js', // js的rev-manifest.json的地址
  revCss: './rev/css' // css的rev-manifest.json的地址
}

// ------- 开发 -------

// 1 使用connect启动一个Web服务器  
gulp.task('webserver', function () {  
  gulp.src('./src')  // 服务器目录（./代表根目录）
  // 运行gulp-webserver
  .pipe(webserver({
      port: 8000,  //端口，默认8000
      livereload: true,  // 启用LiveReload
      open: true,  // 服务器启动时自动打开网页
      directoryListing: {
          enable: false,
          path: './src'
      },
      fallback: 'index.html',
      proxies: []
  }))
})

// 2 转译less
gulp.task('less', function () {
  return gulp.src(path.less)
        .pipe(less())
        .pipe(gulp.dest('./src/css/less'))
        .pipe(notify({ message: 'less编译成功' }))
})

// 3 合并css
gulp.task('css', ['less'], function () {
  return gulp.src([path.css,'./src/css/less/*.css'])
        .pipe(concat('demo.css'))
        .pipe(gulp.dest(path.destCss))
        // .pipe(rev.manifest()) // 生成一个rev-manifest.json
        // .pipe(gulp.dest('./src/rev/css'))
        .pipe(notify({ message: 'css合并成功' }))
})

// 4 合并js
gulp.task('js', function() {
  return gulp.src(path.js)
        .pipe(babel()) // 需要转换编译es6语法 并需要配置 babel
        .pipe(concat('demo.js')) // 合并js文件并命名为demo.js
        .pipe(gulp.dest(path.destJs)) // 输出在dest/js目录下
        .pipe(notify({ message: 'js合并压缩成功' }))
})


// 5 创建刷新html的任务  refresh
gulp.task('refresh', function () {
  gulp.src(path.html)
      .pipe(webserver.reload())
})

// 6 监听html文件实时调用 refresh
gulp.task('watch', function () {
  gulp.watch(path.less, ['css'])
  gulp.watch(path.css, ['css'])
  gulp.watch(path.js, ['js'])
  gulp.watch(path.destJs, ['refresh'])
  gulp.watch(path.destCss, ['refresh'])
  gulp.watch(path.html, ['refresh'])
})


// ------- 打包 -------

// 1 打包css并生成版本
gulp.task('revCss',['css'], function () {
  gulp.src(path.destCss + '/*.css')
  .pipe(minify())
  // .pipe(rename({suffix: '.min'}))
  .pipe(rev())  // 文件名加MD5后缀
  .pipe(gulp.dest('./build/dest/css'))
  .pipe(rev.manifest()) // 生成一个rev-manifest.json
  .pipe(gulp.dest(path.revCss))
})


// 2 打包js并生成版本
gulp.task('revJs',['js'], function () {
  gulp.src(path.destJs + '/*.js')
  .pipe(uglify())// 压缩js
  // .pipe(rename({ suffix: '.min' })) // 添加后缀.min
  .pipe(rev())  // 文件名加MD5后缀
  .pipe(gulp.dest('./build/dest/js'))
  .pipe(rev.manifest()) // 生成一个rev-manifest.json
  .pipe(gulp.dest(path.revJs))
})


// 3 更新版本
gulp.task('revHtml', function () {
  return gulp.src(['./rev/**/*.json', path.html]) // 找到相应生成的rev-manifest.json
      .pipe(revCollector()) // 替换path.html中的名字
      .pipe(gulp.dest('./build'))
      .pipe(notify({ message: '打包成功' }))
})

// 4 排序生成所有打包文件
gulp.task('collect', ['revJs', 'revCss'], function () {
  gulp.run('revHtml')
})

// 5 然后压缩成.zip文件
gulp.task('zip', function () {
  return gulp.src('./build/**')
  .pipe(zip('gulp-demo' + '.zip'))
  .pipe(gulp.dest('./'))
})


// 运行 Gulp client
gulp.task('dev', ['webserver', 'watch'])
// 运行 Gulp bulid
gulp.task('build', ['collect'])
// 打包
gulp.task('build:zip', ['zip'])

