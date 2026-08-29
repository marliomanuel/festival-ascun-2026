/* ============================================================
   COMPORTAMIENTO DEL SITIO
   Normalmente no necesitas editar este archivo.
   ============================================================ */
(function () {
  "use strict";

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const crear = (tag, clase) => {
    const el = document.createElement(tag);
    if (clase) el.className = clase;
    return el;
  };
  const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esMovil = () => window.matchMedia("(max-width: 900px)").matches;

  /* ---------------------------------------------------------
     ENLACES DE CAYENA
  --------------------------------------------------------- */
  const ponerEnlace = (id, url, externo) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (!url || url === "#") {
      el.setAttribute("aria-disabled", "true");
      el.style.opacity = ".55";
      el.style.pointerEvents = "none";
      return;
    }
    el.href = url;
    if (externo) { el.target = "_blank"; el.rel = "noopener noreferrer"; }
  };
  ponerEnlace("cayenaInstituciones", CAYENA.instituciones, true);
  ponerEnlace("cayenaAdmin", CAYENA.administradores, true);
  ponerEnlace("btnCayenaReglamentos", CAYENA.instituciones, true);

  /* ---------------------------------------------------------
     CABEZOTE, MENÚ Y SUBMENÚS
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
    if (abierto) cerrarSubmenus();
  });

  const disparadores = $$(".tiene-submenu > [aria-controls]");

  function cerrarSubmenus(excepto) {
    disparadores.forEach((d) => {
      if (d === excepto) return;
      d.setAttribute("aria-expanded", "false");
      const panel = document.getElementById(d.getAttribute("aria-controls"));
      if (panel) panel.classList.remove("submenu--abierto");
    });
  }

  disparadores.forEach((disparador) => {
    const panel = document.getElementById(disparador.getAttribute("aria-controls"));
    const contenedor = disparador.parentElement;

    const abrir = (v) => {
      disparador.setAttribute("aria-expanded", String(v));
      panel.classList.toggle("submenu--abierto", v);
      if (v) cerrarSubmenus(disparador);
    };

    disparador.addEventListener("click", (e) => {
      e.preventDefault();
      abrir(disparador.getAttribute("aria-expanded") !== "true");
    });

    // En escritorio también se abre al pasar el mouse
    contenedor.addEventListener("mouseenter", () => { if (!esMovil()) abrir(true); });
    contenedor.addEventListener("mouseleave", () => { if (!esMovil()) abrir(false); });
    contenedor.addEventListener("focusout", (e) => {
      if (!esMovil() && !contenedor.contains(e.relatedTarget)) abrir(false);
    });
    panel.addEventListener("click", (e) => { if (e.target.closest("a")) abrir(false); });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".tiene-submenu")) cerrarSubmenus();
  });

  menu.addEventListener("click", (e) => {
    const enlace = e.target.closest("a");
    if (enlace && enlace.getAttribute("href") && enlace.getAttribute("href").startsWith("#")) {
      btnMenu.setAttribute("aria-expanded", "false");
      menu.classList.remove("menu--abierto");
      cerrarSubmenus();
    }
  });

  /* ---------------------------------------------------------
     SLIDER
  --------------------------------------------------------- */
  const pista = $("#sliderPista");
  const puntos = $("#sliderPuntos");
  const INTERVALO = 6500;
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
      v.muted = true; v.playsInline = true; v.preload = "metadata";
      v.setAttribute("aria-label", s.alt || "");
      v.addEventListener("ended", () => { if (i === indice) avanzar(1); });
      slide.appendChild(v);
      slide.dataset.video = "1";
    } else {
      const img = crear("img", "slide__medio");
      img.src = s.src; img.alt = s.alt || "";
      img.loading = i === 0 ? "eager" : "lazy";
      slide.appendChild(img);
    }

    const capa = crear("div", "slide__capa");
    const caja = crear("div", "slide__texto");
    if (s.rotulo) { const r = crear("p", "slide__rotulo"); r.textContent = s.rotulo; caja.appendChild(r); }
    if (s.titulo) { const t = crear(i === 0 ? "h1" : "p", "slide__titulo"); t.textContent = s.titulo; caja.appendChild(t); }
    if (s.texto) { const p = crear("p", "slide__parrafo"); p.textContent = s.texto; caja.appendChild(p); }
    if (s.enlace) {
      const a = crear("a", "boton-solido");
      a.href = s.enlace.url; a.textContent = s.enlace.texto;
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
    if (slides[indice] && slides[indice].dataset.video === "1") return;
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
      '<span class="tarjeta-agenda__conteo">' + total + ' actividades</span>' +
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
  const modalTitulo = $("#modalTitulo");
  const modalRotulo = $("#modalRotulo");
  const modalNota = $("#modalNota");
  const modalCuerpo = $("#modalCuerpo");
  let ultimoFoco = null;

  const iconoLugar = '<svg viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="M12 21s7-5.686 7-11a7 7 0 10-14 0c0 5.314 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>';

  function abrirAgenda(cat, origen) {
    ultimoFoco = origen;
    modal.style.setProperty("--color", cat.color);
    modalRotulo.textContent = "Agenda de programación · Barranquilla";
    modalTitulo.textContent = cat.nombre;
    modalNota.textContent = cat.nota || "";
    modalCuerpo.innerHTML = "";

    cat.dias.forEach((dia) => {
      const bloque = crear("section", "dia");
      const h = crear("h3", "dia__fecha");
      h.textContent = dia.fecha;
      bloque.appendChild(h);

      const lista = crear("ul", "dia__lista");
      dia.eventos.forEach((ev) => {
        const li = crear("li", "evento");
        li.innerHTML =
          '<span class="evento__hora">' + ev.hora + '</span>' +
          '<span class="evento__nombre">' + ev.evento + '</span>' +
          '<span class="evento__lugar">' + iconoLugar + ev.lugar + '</span>';
        lista.appendChild(li);
      });
      bloque.appendChild(lista);
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
  modal.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const focos = modal.querySelectorAll("button, a[href]");
    if (!focos.length) return;
    const primero = focos[0], ultimo = focos[focos.length - 1];
    if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
  });

  /* ---------------------------------------------------------
     CIRCULARES
  --------------------------------------------------------- */
  const listaCirculares = $("#circulares-lista");
  CIRCULARES.forEach((c) => {
    const art = crear("article", "circular");
    art.innerHTML =
      '<p class="circular__numero">' + c.numero + '</p>' +
      '<h3 class="circular__titulo">' + c.titulo + '</h3>' +
      '<p class="circular__fecha">' + c.fecha + '</p>' +
      '<p class="circular__resumen">' + c.resumen + '</p>' +
      '<div class="circular__acciones">' +
        '<a class="boton-linea boton-linea--relleno" href="' + c.archivo + '" target="_blank" rel="noopener">Ver documento</a>' +
        '<a class="boton-linea" href="' + c.archivo + '" download>Descargar PDF</a>' +
      '</div>';
    listaCirculares.appendChild(art);
  });

  /* ---------------------------------------------------------
     PREMIACIÓN (se arma sola desde las agendas)
  --------------------------------------------------------- */
  const listaPremiacion = $("#premiacion-lista");
  AGENDAS.forEach((cat) => {
    let encontrado = null;
    cat.dias.forEach((dia) => {
      dia.eventos.forEach((ev) => {
        if (!encontrado && /premiaci/i.test(ev.evento)) {
          encontrado = { fecha: dia.fecha, hora: ev.hora, lugar: ev.lugar };
        }
      });
    });

    const item = crear("article", "premio");
    item.style.setProperty("--color", cat.color);
    const detalle = encontrado
      ? '<span class="premio__dato"><strong>' + encontrado.fecha + '</strong> · <span class="premio__hora">' + encontrado.hora + '</span></span>' +
        '<span class="premio__dato">' + encontrado.lugar + '</span>'
      : '<span class="premio__dato">Fecha y escenario de premiación por confirmar.</span>' +
        '<span class="premio__dato">Consulta la Circular 002.</span>';

    item.innerHTML = '<span class="premio__marca"></span><div><h3 class="premio__nombre">' + cat.nombre + '</h3>' + detalle + '</div>';
    listaPremiacion.appendChild(item);
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
    cerrarSubmenus();
  });

  /* ---------------------------------------------------------
     REGLAMENTO GENERAL
  --------------------------------------------------------- */
  if (typeof REGLAMENTO !== "undefined") {
    $("#regVersion").textContent = REGLAMENTO.version + " · " + REGLAMENTO.paginas + " páginas";
    $("#regTitulo").textContent = REGLAMENTO.titulo;
    $("#regDescripcion").textContent = REGLAMENTO.descripcion;
    $("#regVer").href = REGLAMENTO.archivo;
    $("#regDescargar").href = REGLAMENTO.archivo;

    const listaCapitulos = $("#capitulos-lista");
    REGLAMENTO.capitulos.forEach((c) => {
      const li = crear("li");
      const a = crear("a", "capitulo");
      a.href = REGLAMENTO.archivo + "#page=" + c.pagina;
      a.target = "_blank";
      a.rel = "noopener";
      a.innerHTML =
        '<span class="capitulo__nombre">' + c.nombre + '</span>' +
        '<span class="capitulo__pagina">p. ' + c.pagina + '</span>';
      li.appendChild(a);
      listaCapitulos.appendChild(li);
    });
  }

  /* ---------------------------------------------------------
     FECHAS CLAVE Y TARIFAS
  --------------------------------------------------------- */
  const listaFechas = $("#fechas-lista");
  FECHAS.forEach((f) => {
    const li = crear("li");
    li.innerHTML =
      '<span class="fechas__limite">' + f.limite + '</span>' +
      '<span class="fechas__actividad">' + f.actividad + '</span>' +
      '<span class="fechas__responsable">' + f.responsable + '</span>';
    listaFechas.appendChild(li);
  });

  const cuerpoTarifas = $("#tabla-tarifas tbody");
  TARIFAS.forEach((t) => {
    const tr = crear("tr");
    tr.innerHTML = '<td>' + t.modalidad + '</td><td>' + t.tipo + '</td><td>' + t.asociadas + '</td><td>' + t.noAsociadas + '</td>';
    cuerpoTarifas.appendChild(tr);
  });

  /* ---------------------------------------------------------
     ORGANIZADORES
  --------------------------------------------------------- */
  const listaPatrocinadores = $("#patrocinadores-lista");
  PATROCINADORES.forEach((p) => {
    const a = crear("a", "logo-patrocinador");
    a.href = p.url || "#";
    if (p.url && p.url !== "#") { a.target = "_blank"; a.rel = "noopener noreferrer"; }
    a.innerHTML = '<img src="' + p.logo + '" alt="' + p.nombre + '" loading="lazy">';
    listaPatrocinadores.appendChild(a);
  });

  /* ---------------------------------------------------------
     APARICIÓN AL HACER SCROLL
  --------------------------------------------------------- */
  if (!menosMovimiento && "IntersectionObserver" in window) {
    const objetivos = $$(".seccion");
    objetivos.forEach((el) => el.classList.add("aparece"));
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("aparece--visible"); obs.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    objetivos.forEach((el) => obs.observe(el));
  }
})();
