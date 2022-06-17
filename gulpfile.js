/*LLAMADA DE DEPENDENCIAS*/

const { src, dest, watch, parallel } = require("gulp");

//Dependencias CSS
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//Dependencias Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

//Dependencias JavaScript
const terser = require('gulp-terser-js');
/*DECLARACION DE FUNCIONES O CREACION DE TAREAS */

function css(done) {
  //para compilar una hoja de estilos, tenemos que realizar 3 pasos
  src('src/scss/**/*.scss') //1.- Identificar el archivo SASS
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())//2.- Compilarlo
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest("build/css"));//3.-  Almacenarla en el disco duro

  done();//callback que avisa que llegamos al final de la funcion
};

function imagenes(done) {
  const opciones = {
    optimizationLevel: 3
  }

  src('src/img/**/*.{png,jpg}')
    .pipe(cache(imagemin(opciones)))
    .pipe(dest('build/img'))
  done();
}

function versionWebp(done) {
  const opciones = {
    quality: 50
  };

  src('src/img/**/*.{png,jpg}')
    .pipe(webp(opciones))
    .pipe(dest('build/img'));//La carpeta de salida
  done();
}

function versionAvif(done) {
  const opciones = {
    quality: 50
  };

  src('src/img/**/*.{png,jpg}')
    .pipe(avif(opciones))
    .pipe(dest('build/img'))
  done();
}

/*MANEJO DE JS */
function javascript(done) {
  src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/js'));

  done();
};

function dev(done) {
  watch('src/scss/**/*.scss', css);
  watch('src/js/**/*.js', javascript);
  done();
};


/**HACER DISPONIBLES LAS FUNCIONES */

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(versionAvif, imagenes, versionWebp, javascript, dev);
//Ejecuta dos funciones al mismo tiempo, en este caso ejecuta la funcion webp y se queda escuchando por cambios de la funcion dev
// exports.dev = parallel(javascript, dev)