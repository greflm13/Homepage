const gulp = require('gulp'),
    changed = require('gulp-changed'),
    del = require('del'),
    path = require('path'),
    ts = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    using = require('gulp-using'),
    typescript = require('typescript'),
    sequence = require('run-sequence'),
    merge = require('merge-stream');

const tsProject = ts.createProject("tsconfig.json");

let hasError = false;
let finalMessage = '';
const sep = '----------------------------------------------------------------------------';

gulp.task('default', ['run']);

gulp.task('run', ['build']);

gulp.task('cleanAndBuild', function(done) {
    sequence('clean', 'build', done);
});

gulp.task('build', function(done) {
    sequence('transpile', 'copyFiles', () => {
        console.log(finalMessage);
    });
});

gulp.task('clean', function(done) {
    const toDelete = ['dist/*'];
    for (let s of toDelete) {
        console.log(' --> deleting ' + s);
    }
    return del(toDelete);
});

gulp.task('transpile', function(done) {
    const tsResult = gulp.src('src/**/*.ts')
        .pipe(changed('dist', { extension: '.js' }))
        .pipe(using({ prefix: '  --> Transpiling file', path: 'cwd', color: 'green', filesize: false }))
        .pipe(sourcemaps.init())
        .pipe(tsProject({ error: myReporter, finish: myFinishHandler }))
        .js.pipe(sourcemaps.mapSources(
            function(sourcePath, file) {
                return sourcePath.substr(0);
            }))
        .pipe(sourcemaps.write('./', { sourceRoot: __dirname }))
        .pipe(gulp.dest('dist'));
    return tsResult;
});

gulp.task('copyFiles', function(done) {

    const copyPugViews =
        gulp
        .src('src/views/**/*')
        .pipe(changed('dist/views', { extension: '.pug' }))
        .pipe(using({ prefix: '  --> Copying file', path: 'cwd', color: 'blue', filesize: false }))
        .pipe(gulp.dest('dist/views/'));


    const copyPublic =
        gulp
        .src('src/public/**/*')
        .pipe(changed('dist/public', {}))
        .pipe(using({ prefix: '  --> Copying file', path: 'cwd', color: 'blue', filesize: false }))
        .pipe(gulp.dest('dist/public/'));

    return merge(copyPugViews, copyPublic);
});

const cache = {};

function myReporter(error) {
    if (cache[error.message]) {
        return;
    }
    cache[error.message] = true;
    console.log(error.message);
}


function myFinishHandler(results) {
    let msg = sep;

    const showErrorCount = (count, errorTyp) => {
        if (count === 0) {
            return;
        }
        hasError = true;
        msg += '\nTypescript: ' + count.toString() + ' ' + errorTyp + ' errors.';
    }

    showErrorCount(results.transpileErrors, '');
    showErrorCount(results.optionsErrors, 'options');
    showErrorCount(results.syntaxErrors, 'syntax');
    showErrorCount(results.globalErrors, 'global');
    showErrorCount(results.semanticErrors, 'semantic');
    showErrorCount(results.declarationErrors, 'declaration');
    showErrorCount(results.emitErrors, 'emit');

    if (hasError) {
        msg += '\n' + sep;
    }

    if (results.emitSkipped) {
        msg += '\nTypeScript: emit failed';
    } else if (hasError) {
        msg += '\nTypeScript: emit succeeded (with errors)';
    } else {
        msg += '\nTypeScript: emit succeeded (no errors)';
    }

    finalMessage = msg;
}