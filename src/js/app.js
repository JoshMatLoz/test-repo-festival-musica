const d = document, w = window;

d.addEventListener("DOMContentLoaded", (e) => {
  iniciarApp();
});

function iniciarApp() {
  crearGaleria();
  scrollNav();
  navegacionFija();
};

function navegacionFija() {
  const $barra = d.querySelector('.header'),
    $sobreFestival = d.querySelector('.sobre-festival'),
    $body = d.querySelector('body');

  w.addEventListener('scroll', function () {
    if ($sobreFestival.getBoundingClientRect().bottom < 0) {
      $barra.classList.add('fijo');
      $body.classList.add('body-scroll')
    } else {
      $barra.classList.remove('fijo');
      $body.classList.remove('body-scroll');
    }
  })
};

function crearGaleria() {
  const $galeria = d.querySelector('.galeria-imagenes'),
    $fragment = d.createDocumentFragment();


  for (let i = 1; i <= 12; i++) {
    const $imagen = d.createElement('picture');
    $imagen.innerHTML =
      `
      <source srcset="build/img/thumb/${i}.avif" type="image/avif">
      <source srcset="build/img/thumb/${i}.webp" type="image/webp">
      <img loading="lazy" width="300" height="200" src="build/img/thumb/${i}.jpg" alt="Imagen Galeria numero: ${i}">
    `;
    $fragment.appendChild($imagen);
    $imagen.onclick = function () {
      mostrarImagen(i);
    };
  };
  $galeria.appendChild($fragment);
};

function mostrarImagen(index) {
  const $imagen = d.createElement('picture'),
    $overlay = d.createElement('div'),
    $body = d.querySelector('body');
  $imagen.innerHTML =
    `
      <source srcset="build/img/grande/${index}.avif" type="image/avif">
      <source srcset="build/img/grande/${index}.webp" type="image/webp">
      <img loading="lazy" width="300" height="200" src="build/img/grande/${index}.jpg" alt="Imagen Galeria numero: ${index}">
    `;

  //Crea el Overlay con la imagen
  $overlay.appendChild($imagen);
  $overlay.classList.add('overlay');

  $overlay.onclick = function () {
    $body.classList.remove('fijar-body');
    $overlay.remove();
  };


  //Botón para cerrar el modal
  const $cerrarModal = d.createElement('P');
  $cerrarModal.textContent = 'X';
  $overlay.appendChild($cerrarModal);

  $cerrarModal.onclick = function () {
    $body.classList.remove('fijar-body');
    $overlay.remove();
  };

  //Añadir al HTML
  $body.appendChild($overlay);
  $body.classList.add('fijar-body');
  $cerrarModal.classList.add('btn-cerrar');
};

function scrollNav() {
  const $enlaces = d.querySelectorAll('.navegacion-principal a');

  $enlaces.forEach(el => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      const $seccionScroll = e.target.attributes.href.value,
        $seccion = d.querySelector($seccionScroll);
      $seccion.scrollIntoView({ behavior: "smooth" });
    });
  });
};