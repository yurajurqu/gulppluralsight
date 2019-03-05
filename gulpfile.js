// jshint -W104
let gulp=require('gulp'),
args =require('yargs').argv,
$=require('gulp-load-plugins')({lazy:true}),
config=require('./gulp.config')();

const rev = require('gulp-rev');

var RevAll = require("gulp-rev-all");


gulp.task('ren',function(){
    return gulp.src(['./src/client/**/*.css', './src/client/**/*.js'], {base: './src/client'})
    //.pipe(gulp.dest('./build'))  // copy original assets to build dir
    .pipe(rev())
    .pipe(gulp.dest('./build'))  // write rev'd assets to build dir
    .pipe(rev.manifest())
    .pipe(gulp.dest('./build'))  // write manifest to build dir
});

// By default, Gulp would pick `assets/css` as the base,
// so we need to set it explicitly:


gulp.task("rename", function() {
   return  gulp
      .src("./src/client/**")
      .pipe(RevAll.revision({
        includeFilesInManifest:['.css', '.js','.html'],
        dontRenameFile:['index.html','specs.html','.png','.gif','.jpg','.jpeg'],
        //  transformPath: function(rev, source, path) {
        //     // on the remote server, image files are served from `/images`
        //     return rev.replace("/img", "/images");
        //   }
      }))
      .pipe(gulp.dest("./dist"))
      .pipe(RevAll.manifestFile())
      .pipe(gulp.dest("./dist"));
    });

// jshint=require('gulp-jshint'),
// jscs=require('gulp-jscs'),
// util=require('gulp-util'),
// gulpprint =require('gulp-print').default,
// gulpif =require('gulp-if');


gulp.task('vet',function(){
    log({
        title: 'Gulp.js',
        author:'Omar Dante Barboza Pastrana'
    });
    log('Analyzing source with JSHint and JSCS');
    return gulp.src(config.alljs)
    .pipe($.if(args.verbose,$.print.default()))
    .pipe($.jscs())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish',{
        verbose:true
    }))
   .pipe($.jshint.reporter('fail'))  //stop if any validation has errors
    ;
});
function log(msg){
    if(typeof(msg)==='object'){
        for(var item in msg){
            if (msg.hasOwnProperty(item)){
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else
    {
        $.util.log($.util.colors.blue(msg));
    }
}