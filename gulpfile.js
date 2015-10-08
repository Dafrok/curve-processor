var gulp=require('gulp')
var webpack=require('webpack-stream')
var jade=require('gulp-jade')
var plumber=require('gulp-plumber')
var uglify=require('gulp-uglify')
var browserSync=require('browser-sync')

var paths={
  dev:{
    jade:'src/jade/**/*.jade',
    js:'src/js/**',
    stylus:'src/stylus/**',
  },
  build:{
    html:'build',
    js:'build/js',
    css:'build/css'
  }
}

gulp.task('browser-sync',function(){
  browserSync({
    server:{
      baseDir:"./build/"
    }
  })
  gulp.watch(paths.dev.jade,['jade'])
  gulp.watch([paths.dev.js,paths.dev.stylus],['webpack'])
  gulp.watch(['build/**'],['reload'])
})

gulp.task('reload',function(){
  return browserSync.reload()
})


gulp.task('jade',function(){
  gulp.src(paths.dev.jade)
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest(paths.build.html))
})

gulp.task('webpack',function(){
  return gulp.src([paths.dev.js])
    .pipe(plumber())
    .pipe(webpack({
      entry:'./src/js/example/entry.js',
      output:{
        filename:'bundle.js'
      },
      module:{
        loaders:[
          {test:/\.js?$/,loader: 'babel-loader'},
          {test:/\.styl?$/,exclude: /(node_modules|bower_components)/,loader: 'style-loader!css-loader!autoprefixer-loader!stylus-loader'}
        ]
      },
      stage:0
    }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.build.js))
})

gulp.task('default',['browser-sync','webpack','jade'])