/* ============================================================
   COMPORTAMIENTO DEL SITIO
   Normalmente no necesitas editar este archivo.
   ============================================================ */
(function () {
  "use strict";

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const crear = (tag, clase) => {
    const el = document.createElement(tag);
    if (clase) el.className = clase;
    return el;
  };
  const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------
     CABEZOTE: sombra al hacer scroll + menú móvil
  --------------------------------------------------------- */
  const cabezote = $("#cabezote");
  const btnMenu = $("#btnMenu");
  const menu = $("#menu");

  const marcarScroll = () => cabezote.classList.toggle("cabezote--compacto", window.scrollY > 24);
  marcarScroll();
  window.addEventListener("scroll", marcarScroll, { passive: true });

  btnMenu.addEventListener("click", () => {
    const abierto = btnMenu.getAttribute("aria-expanded") === "true";
    btnMenu.setAttribute("aria-expanded", String(!abierto));
    menu.classList.toggle("menu--abierto", !abierto);
  });

  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      btnMenu.setAttribute("aria-expanded", "false");
      menu.classList.remove("menu--abierto");
    }
  });

  /* ---------------------------------------------------------
     SLIDER
  --------------------------------------------------------- */
  const pista = $("#sliderPista");
  const puntos = $("#sliderPuntos");
  const INTERVALO = 6000;
  let indice = 0;
  let reloj = null;

  SLIDES.forEach((s, i) => {
    const slide = crear("article", "slide");
    slide.setAttribute("aria-roledescription", "diapositiva");
    slide.setAttribute("aria-label", (i + 1) + " de " + SLIDES.length);
    if (i === 0) slide.classList.add("slide--activa");

    if (s.tipo === "video") {
      const v = crear("video", "slide__medio");
      v.src = s.src;
      if (s.poster) v.poster = s.poster;
      v.muted = true;
      v.playsInline = true;
      v.preload = "metadata";
      v.setAttribute("aria-label", s.alt || "");
      v.addEventListener("ended", () => { if (i === indice) avanzar(1); });
      slide.appendChild(v);
      slide.dataset.video = "1";
    } else {
      const img = crear("img", "slide__medio");
      img.src = s.src;
      img.alt = s.alt || "";
      img.loading = i === 0 ? "eager" : "lazy";
      slide.appendChild(img);
    }

    const capa = crear("div", "slide__capa");
    const caja = crear("div", "slide__texto");
    if (s.rotulo) { const r = crear("p", "slide__rotulo"); r.textContent = s.rotulo; caja.appendChild(r); }
    if (s.titulo) { const t = crear("h1", "slide__titulo"); t.textContent = s.titulo; caja.appendChild(t); }
    if (s.texto)  { const p = crear("p", "slide__parrafo"); p.textContent = s.texto; caja.appendChild(p); }
    if (s.enlace) {
      const a = crear("a", "boton-solido");
      a.href = s.enlace.url;
      a.textContent = s.enlace.texto;
      if (s.enlace.externo) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
      caja.appendChild(a);
    }
    capa.appendChild(caja);
    slide.appendChild(capa);
    pista.appendChild(slide);

    const punto = crear("button", "punto");
    punto.type = "button";
    punto.setAttribute("role", "tab");
    punto.setAttribute("aria-label", "Diapositiva " + (i + 1));
    punto.setAttribute("aria-selected", String(i === 0));
    punto.addEventListener("click", () => mostrar(i));
    puntos.appendChild(punto);
  });

  const slides = Array.from(pista.children);
  const listaPuntos = Array.from(puntos.children);

  function mostrar(n) {
    if (!slides.length) return;
    indice = (n + slides.length) % slides.length;
    slides.forEach((s, i) => {
      s.classList.toggle("slide--activa", i === indice);
      const v = s.querySelector("video");
      if (v) { if (i === indice) { v.currentTime = 0; v.play().catch(() => {}); } else { v.pause(); } }
    });
    listaPuntos.forEach((p, i) => p.setAttribute("aria-selected", String(i === indice)));
    reiniciarReloj();
  }
  const avanzar = (paso) => mostrar(indice + paso);

  function reiniciarReloj() {
    clearInterval(reloj);
    if (menosMovimiento || slides.length < 2) return;
    if (slides[indice] && slides[indice].dataset.video === "1") return; // el video manda
    reloj = setInterval(() => avanzar(1), INTERVALO);
  }

  $("#sliderSiguiente").addEventListener("click", () => avanzar(1));
  $("#sliderAnterior").addEventListener("click", () => avanzar(-1));

  const slider = $(".slider");
  slider.addEventListener("mouseenter", () => clearInterval(reloj));
  slider.addEventListener("mouseleave", reiniciarReloj);
  slider.addEventListener("focusin", () => clearInterval(reloj));
  slider.addEventListener("focusout", reiniciarReloj);
  document.addEventListener("visibilitychange", () => document.hidden ? clearInterval(reloj) : reiniciarReloj());

  // Deslizar con el dedo
  let x0 = null;
  slider.addEventListener("touchstart", (e) => { x0 = e.changedTouches[0].clientX; }, { passive: true });
  slider.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const d = e.changedTouches[0].clientX - x0;
    if (Math.abs(d) > 50) avanzar(d < 0 ? 1 : -1);
    x0 = null;
  }, { passive: true });

  mostrar(0);

  /* ---------------------------------------------------------
     BOTONERA DE AGENDAS
  --------------------------------------------------------- */
  const botonera = $("#botonera");

  AGENDAS.forEach((cat) => {
    const b = crear("button", "tarjeta-agenda");
    b.type = "button";
    b.style.setProperty("--color", cat.color);
    b.dataset.id = cat.id;
    b.setAttribute("aria-haspopup", "dialog");

    const total = cat.dias.reduce((n, d) => n + d.eventos.length, 0);
    b.innerHTML =
      '<span class="tarjeta-agenda__barra"></span>' +
      '<span class="tarjeta-agenda__conteo">' + total + ' eventos</span>' +
      '<span class="tarjeta-agenda__nombre">' + cat.nombre + '</span>' +
      '<span class="tarjeta-agenda__resumen">' + cat.resumen + '</span>' +
      '<span class="tarjeta-agenda__accion">Ver agenda <em aria-hidden="true">→</em></span>';

    b.addEventListener("click", () => abrirAgenda(cat, b));
    botonera.appendChild(b);
  });

  /* ---------------------------------------------------------
     POPUP DE AGENDA
  --------------------------------------------------------- */
  const modal = $("#modal");
  const modalCabeza = $("#modalCabeza");
  const modalTitulo = $("#modalTitulo");
  const modalRotulo = $("#modalRotulo");
  const modalNota = $("#modalNota");
  const modalCuerpo = $("#modalCuerpo");
  let ultimoFoco = null;

  function abrirAgenda(cat, origen) {
    ultimoFoco = origen;
    modal.style.setProperty("--color", cat.color);
    modalRotulo.textContent = "Agenda por categoría";
    modalTitulo.textContent = cat.nombre;
    modalNota.textContent = cat.nota || "";
    modalCuerpo.innerHTML = "";

    cat.dias.forEach((dia) => {
      const bloque = crear("section", "dia");
      const h = crear("h3", "dia__fecha");
      h.textContent = dia.fecha;
      bloque.appendChild(h);

      const tabla = crear("ul", "dia__lista");
      dia.eventos.forEach((ev) => {
        const li = crear("li", "evento");
        li.innerHTML =
          '<span class="evento__hora">' + ev.hora + '</span>' +
          '<span class="evento__nombre">' + ev.evento + '</span>' +
          '<span class="evento__lugar"><svg viewBox="0 0 24 24" aria-hidden="true">' +
          '<path d="M12 21s7-5.686 7-11a7 7 0 10-14 0c0 5.314 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>' +
          '</svg>' + ev.lugar + '</span>';
        tabla.appendChild(li);
      });
      bloque.appendChild(tabla);
      modalCuerpo.appendChild(bloque);
    });

    modal.hidden = false;
    document.body.classList.add("sin-scroll");
    requestAnimationFrame(() => modal.classList.add("modal--visible"));
    $(".modal__cerrar", modal).focus();
  }

  function cerrarModal() {
    modal.classList.remove("modal--visible");
    const fin = () => {
      modal.hidden = true;
      document.body.classList.remove("sin-scroll");
      if (ultimoFoco) ultimoFoco.focus();
    };
    menosMovimiento ? fin() : setTimeout(fin, 200);
  }

  modal.addEventListener("click", (e) => { if (e.target.closest("[data-cerrar]")) cerrarModal(); });

  // Foco atrapado dentro del popup
  modal.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const focos = modal.querySelectorAll("button, a[href]");
    if (!focos.length) return;
    const primero = focos[0], ultimo = focos[focos.length - 1];
    if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
  });

  /* ---------------------------------------------------------
     NOTICIAS
  --------------------------------------------------------- */
  const listaNoticias = $("#noticias-lista");
  NOTICIAS.forEach((n) => {
    const a = crear("a", "noticia");
    a.href = n.url || "#";
    a.innerHTML =
      '<span class="noticia__foto"><img src="' + n.imagen + '" alt="" loading="lazy"></span>' +
      '<span class="noticia__meta"><em>' + n.etiqueta + '</em>' + n.fecha + '</span>' +
      '<span class="noticia__titulo">' + n.titulo + '</span>' +
      '<span class="noticia__resumen">' + n.resumen + '</span>' +
      '<span class="noticia__mas">Leer nota <em aria-hidden="true">→</em></span>';
    listaNoticias.appendChild(a);
  });

  /* ---------------------------------------------------------
     GALERÍA + VISOR
  --------------------------------------------------------- */
  const grilla = $("#galeria-grilla");
  const visor = $("#visor");
  const visorImagen = $("#visorImagen");
  const visorPie = $("#visorPie");
  let focoGaleria = null;

  GALERIA.forEach((g) => {
    const b = crear("button", "foto");
    b.type = "button";
    b.innerHTML = '<img src="' + g.src + '" alt="' + g.alt + '" loading="lazy"><span class="foto__pie">' + g.pie + '</span>';
    b.addEventListener("click", () => {
      focoGaleria = b;
      visorImagen.src = g.src;
      visorImagen.alt = g.alt;
      visorPie.textContent = g.pie;
      visor.hidden = false;
      document.body.classList.add("sin-scroll");
      $(".visor__cerrar", visor).focus();
    });
    grilla.appendChild(b);
  });

  function cerrarVisor() {
    visor.hidden = true;
    document.body.classList.remove("sin-scroll");
    if (focoGaleria) focoGaleria.focus();
  }
  visor.addEventListener("click", (e) => {
    if (e.target.closest("[data-cerrar-visor]") || e.target === visor) cerrarVisor();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!modal.hidden) cerrarModal();
    if (!visor.hidden) cerrarVisor();
  });

  /* ---------------------------------------------------------
     PATROCINADORES (cinta continua)
  --------------------------------------------------------- */
  const cinta = $("#marquesinaCinta");
  const pintarLogos = (grupo) => {
    PATROCINADORES.forEach((p) => {
      const a = crear("a", "logo-patrocinador");
      a.href = p.url || "#";
      if (a.href && !a.href.endsWith("#")) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
      a.innerHTML = '<img src="' + p.logo + '" alt="' + p.nombre + '" loading="lazy">';
      if (grupo === 2) a.setAttribute("aria-hidden", "true");
      cinta.appendChild(a);
    });
  };
  pintarLogos(1);
  pintarLogos(2); // copia para que la cinta se vea infinita

  /* ---------------------------------------------------------
     APARICIÓN AL HACER SCROLL
  --------------------------------------------------------- */
  if (!menosMovimiento && "IntersectionObserver" in window) {
    const objetivos = document.querySelectorAll(".seccion");
    objetivos.forEach((el) => el.classList.add("aparece"));
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("aparece--visible"); obs.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    objetivos.forEach((el) => obs.observe(el));
  }
})();
