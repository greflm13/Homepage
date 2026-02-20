import gulp from 'gulp';
import ts from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';
import changed from 'gulp-changed';

// no type declaration/needs require
const using = require('gulp-using');
const merge = require('merge-stream');

// interface for copying folders
interface IFolder {
    path: string;
    fileExtension?: string;
    dest: string;
}

const tsProject = ts.createProject('tsconfig.json', {
    declaration: false
});

// project paths
const srcDir = 'src/**/';
const distDir = 'dist';

export async function clean() {
    const deletedPaths = await del('dist/*');

    for (const path of deletedPaths) {
        // to create relPath replace 'test-sv/' with relevant parent directory
        const pathRegEx = 'Homepage/';

        const relPath = path.split(pathRegEx);
        console.log(getCurrentTime() + ' Deleted: ./' + relPath[1]);
    }
}

export function transpile() {
    const tsResult = gulp
        .src(srcDir + '*.ts')
        .pipe(tsProject())
        .on('error', function() { 
            // Suppress error event to allow build to continue
            // TypeScript will still emit .js files even with type errors
        })
        .pipe(changed(distDir, { extension: '.js' }))
        .pipe(using({ prefix: 'Transpiled' }))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(distDir));

    return tsResult;
}

// automatically transpile .ts files if modified
export function watchTS() {
    return gulp.watch('.' + srcDir + '*.ts', transpile);
}

export function copyFiles() {
    // add paths and destinatioon, and file extensions if necessary,
    // for folders/files that need to be copied to below array
    const foldersToCopy: IFolder[] = [
        { // public files
            path: 'src/public',
            dest: 'public'
        },
        { // pug views
            path: 'src/views',
            dest: 'views'
        }
        // { // Vue.js dist files
        //     path: '../vue-app/dist',
        //     dest: 'public/app'
        // }
        // { // Angular dist files
        //     path: '../test-ng/dist/test-ng',
        //     dest: 'public/app'
        // }
    ];
    // streams of folders that will be copied
    const merged = merge();

    for (const folder of foldersToCopy) {
        if (folder.fileExtension === undefined) {
            merged.add(
                gulp.src(folder.path + '/**/*')
                    .pipe(changed(distDir + '/' + folder.dest, {}))
                    .pipe(using({ prefix: 'Copied' }))
                    .pipe(gulp.dest(distDir + '/' + folder.dest + '/')));
        } else {
            merged.add(
                gulp.src(folder.path + '/**/*' + folder.fileExtension)
                    .pipe(changed(distDir + '/' + folder.dest, { extension: folder.fileExtension }))
                    .pipe(using({ prefix: 'Copied' }))
                    .pipe(gulp.dest(distDir + '/' + folder.dest + '/')));
        }
    }

    return merged;
}

export function copyJSON() {
    const merged = merge();

    merged.add(
        gulp.src('src/json/*')
            .pipe(changed(distDir + '/', {}))
            .pipe(using({ prefix: 'Copied' }))
            .pipe(gulp.dest(distDir + '/')));

    return merged;
}

// get current time as a string to print in log
// in case you cannot pipe it (e.g. when using 'del')
function getCurrentTime(): string {
    const currentTime = new Date();
    const time = '[' + ('0' + currentTime.getHours()).slice(-2)
        + ':' + ('0' + currentTime.getMinutes()).slice(-2)
        + ':' + ('0' + currentTime.getSeconds()).slice(-2) + ']';

    return time;
}

export default gulp.series(clean, transpile);
export const build = gulp.series(clean, gulp.parallel(transpile, copyFiles));
export const test = gulp.series(clean, gulp.parallel(transpile, copyFiles, copyJSON));
