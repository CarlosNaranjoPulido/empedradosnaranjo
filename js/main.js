/* ============================================================
   Artesanos del Camino - JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Elementos ---------- */
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav__link');
  const yearEl = document.getElementById('year');
  const form = document.getElementById('contactForm');

  const EMAIL_DESTINO = 'hola@artesanosdelcamino.com';

  /* ---------- Header: sombra al hacer scroll ---------- */
  function onScrollHeader() {
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  }

  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Menú móvil ---------- */
  function closeNav() {
    document.body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', function () {
    const isOpen = document.body.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  /* ---------- Animación reveal al hacer scroll ---------- */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---------- Año actual en el footer ---------- */
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Formulario: abrir cliente de correo ---------- */
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nombre = (form.nombre && form.nombre.value ? form.nombre.value : '').trim();
      const telefono = (form.telefono && form.telefono.value ? form.telefono.value : '').trim();
      const correo = (form.correo && form.correo.value ? form.correo.value : '').trim();
      const mensaje = (form.mensaje && form.mensaje.value ? form.mensaje.value : '').trim();

      const subject = encodeURIComponent('Solicitud de presupuesto - ' + nombre);
      const body = encodeURIComponent(
        'Nombre: ' + nombre +
        '\nTelefono: ' + telefono +
        '\nCorreo: ' + correo +
        '\nMensaje: ' + mensaje
      );

      const mailtoUrl = 'mailto:' + EMAIL_DESTINO + '?subject=' + subject + '&body=' + body;
      window.location.href = mailtoUrl;
    });
  }

})();
