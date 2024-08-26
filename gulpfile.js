import gulp from 'gulp';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import postcssPresetEnv from 'postcss-preset-env';
import connect from 'gulp-connect';

const paths = {
    css: {
        src: 'assets/css/**/*.css',
        main: 'assets/css/screen.css',
        dest: 'assets/built'
    },
    js: {
        src: 'assets/js/index.js',
        dest: 'assets/built'
    },
    html: {
        src: './*.html'
    },
    built: 'assets/built/**/*',
    dist: 'dist'
};

const postcssPlugins = [
    postcssImport(),
    postcssNested(),
    postcssPresetEnv({
        stage: 1,
        features: {
            'nesting-rules': true
        }
    })
];

function processCss() {
    return gulp.src(paths.css.main)
        .pipe(sourcemaps.init())
        .pipe(postcss(postcssPlugins))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.css.dest))
        .pipe(connect.reload());
}

function minifyJs() {
    return gulp.src(paths.js.src)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(connect.reload());
}

function reloadHtml() {
    return gulp.src(paths.html.src)
        .pipe(connect.reload());
}

function serve() {
    connect.server({
        root: './',
        livereload: true,
        port: '3000'
    });
}

function watchFiles() {
    gulp.watch(paths.css.src, processCss);
    gulp.watch(paths.js.src, minifyJs);
    gulp.watch(paths.html.src, reloadHtml);
}

const build = gulp.series(processCss, minifyJs);
const develop = gulp.parallel(watchFiles, serve);

export {
    processCss,
    minifyJs,
    reloadHtml,
    develop,
    build
};

export default gulp.series(build, develop);