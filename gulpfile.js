//gulp的运行，是以task为基础的。
//所以我们使用gulp，就是在定义各种task(任务)

//使用gulp定义任务的方式：
//  1. 将gulp导入到该文件
//  2. 调用task方法

//从node_modules中，引入gulp模块
// var cuijn_gulp = require('gulp')
// function test() {
//     console.log('测试gulp环境是否搭建成功')
//     //Promise.resolve() 返回一个状态是fulfill的promise对象
//     return Promise.resolve()
// }
//第一个参数为任务名称，第二个参数为回调，执行任务时所做的事情
// cuijn_gulp.task("test", test)

//  1. 定义一个任务，将src下的index.html拷贝到dist下
const gulp = require('gulp')
function copyIndex() {
    return gulp.src('./src/index.html')    //将文件读取到了内存中
        .pipe(gulp.dest('./dist'))  //pipe的作用就是讲pipe前边的操作结果，传给后续的操作作为输入
}
gulp.task('copy-index', copyIndex)

//  2. 定义一个任务，将src下的html下的所有html文件，拷贝到dist的html下
function copyHtml() {
    return gulp.src('./src/html/*.html')
        .pipe(gulp.dest('./dist/html'))
}
gulp.task('copy-html', copyHtml)

//  3. 拷贝图片资源
function copyImg() {
    return gulp.src('./src/assets/imgs/**/*.{png,jpg,gif,bmp,jepg}')
        .pipe(gulp.dest('./dist/assets/imgs'))
}

gulp.task('copy-img', copyImg)

let copy = gulp.parallel(copyHtml,copyIndex)

gulp.task('copy', copy)

//定义一个任务，用来编译sass
//gulp自身无法去编译sass，所以我们需要依赖一个插件(gulp-sass)
//使用插件的步骤是：
//  1. npm来安装这个插件
//  2. 在gulpfile.js中，通过requre，导入这个插件
//  3. 直接使用

//下载node-sass时失败，时因为从国外服务器下载导致的
// 我们可以从国内的镜像服务器下载node包
//  1. 安装cnpm 【npm install -g cnpm --registry=https://registry.npm.taobao.org】
//  2. 使用cnpm install来安装node包
const gulpSass = require('gulp-sass')
const plumber = require('gulp-plumber')
function sass() {
    console.log('aaaaaaaaaaaaa')
    return gulp.src('./src/style/**/*.scss')
        .pipe(plumber())
        .pipe(gulpSass({ outputStyle: 'compressed' }))//outputStyle: 'compact', 'compressed', 'expanded', 'nested'
        .pipe(gulp.dest('./dist/css'))
}

gulp.task('sass', sass)

//连接JS，gulp需要依赖插件(gulp-concat)
//压缩，需要依赖插件(gulp-uglify)
const concat = require('gulp-concat')
function js() {
    return gulp.src('./src/script/index/*.js')
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./dist/js')) 
}
gulp.task('js', js)
function jszhuce() {
  return gulp.src('./src/script/register/*.js')
    .pipe(concat('register.js'))
    .pipe(gulp.dest('./dist/js'))
}
function jsdenglu() {
  return gulp.src('./src/script/login/*.js')
    .pipe(concat('login.js'))
    .pipe(gulp.dest('./dist/js'))
}
//定义一个任务，用来生成精灵图
const spritesmith = require('gulp.spritesmith');
function sprite() {
    return gulp.src('./src/assets/icons/**/*.png')
        .pipe(/*生成精灵图*/ spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css'
        }))
        .pipe(gulp.dest('./dist/assets/icons'))
}

gulp.task('sprite', sprite)



//合并上面的任务，实现批量的执行
var build = gulp.parallel(copy, sass, js)
gulp.task('build', build)

//我们在项目中，可能会用到很多的node包，为了能够使得开发人员统一知道所有的依赖包，
//就需要将其记录下来，记录的位置，就是放在package.json中




//建立一个任务, 实现监听文件改变，自动执行任务
//gulp-watch来实现文件监听
const watch = require('gulp-watch')
const connect = require('gulp-connect')

function watchTask() {
    
    watch('./src/**/*.*', function () {
        copy()
        sass()
        js()
        jszhuce()
        jsdenglu()
    })

    watch('./dist/**/*.*', function () {
        reload();
    })

    // return Promise.resolve()
    // return gulp.watch('./dist/**/*.*', function () {
    //     reload()
    // })
}
gulp.task('watch', watchTask)

function reload() {
    gulp.src('./dist/**/*.html')
        .pipe(connect.reload())
}

const proxy = require('http-proxy-middleware');
//自动刷新
//gulp实现不了，于是需要依赖插件gulp-connect(服务器，可以实现实时刷新)
function server() {
    connect.server({
        root: './dist',
        livereload: true,
        port: 8888,
          middleware: function (connect, opt) {
            return [
              //以/api开头的请求，都会进行转发，转发的目的地，就是target指向的服务器
              proxy('/api', {
                target: 'http://localhost:8080', //apache服务器
                changeOrigin: true
              })
            ]
          }
    })

    // return Promise.resolve()
}

gulp.task('server', server)

const defaultTask = gulp.parallel(server, watchTask)
gulp.task('default', defaultTask)
