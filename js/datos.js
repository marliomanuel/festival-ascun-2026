/* ============================================================
   DATOS DEL FESTIVAL
   Este es el ÚNICO archivo que necesitas editar para actualizar
   el contenido del sitio. No toques js/app.js salvo que quieras
   cambiar comportamiento.
   ============================================================ */

/* ------------------------------------------------------------
   1. SLIDER
   tipo: "imagen" o "video"
   - imagen -> usa "src" (archivo dentro de img/)
   - video  -> usa "src" (archivo .mp4 dentro de img/) y "poster"
   El slider avanza solo cada 6 segundos; en los videos espera a
   que terminen antes de pasar al siguiente.
------------------------------------------------------------ */
const SLIDES = [
  {
    tipo: "imagen",
    src: "img/slide-1.svg",
    alt: "Delegación de danza en tarima",
    rotulo: "12 — 17 de octubre · Barranquilla",
    titulo: "Festival Nacional Universitario 2026",
    texto: "Seis categorías, una semana, todo el país universitario en escena.",
    enlace: { texto: "Ver agendas", url: "#agendas" }
  },
  {
    tipo: "imagen",
    src: "img/slide-2.svg",
    alt: "Ensayo de teatro universitario",
    rotulo: "Convocatoria abierta",
    titulo: "Inscribe tu delegación",
    texto: "El registro se realiza en la plataforma oficial de ASCUN hasta el 30 de julio.",
    enlace: { texto: "Ir al formulario", url: "https://inscripciones.ejemplo.com/festival-2026", externo: true }
  },
  {
    tipo: "imagen",
    src: "img/slide-3.svg",
    alt: "Público en la clausura del festival",
    rotulo: "Entrada libre",
    titulo: "Toda la ciudad es escenario",
    texto: "Salas, plazas y auditorios abiertos al público durante los seis días.",
    enlace: { texto: "Conocer el festival", url: "#festival" }
  }
  /* Ejemplo de diapositiva en video:
  ,{
    tipo: "video",
    src: "img/promo.mp4",
    poster: "img/slide-1.svg",
    alt: "Video promocional del festival",
    rotulo: "Video oficial",
    titulo: "Así se vivió 2025",
    texto: "Resumen de la edición anterior en Manizales."
  }
  */
];

/* ------------------------------------------------------------
   2. AGENDAS POR CATEGORÍA
   Cada categoría = un botón de color en la botonera.
   Cada día tiene una lista de eventos con hora, evento y lugar.
------------------------------------------------------------ */
const AGENDAS = [
  {
    id: "danza",
    nombre: "Danza",
    color: "#FF2E7E",
    resumen: "Folclórica, contemporánea y urbana",
    nota: "Teatro Amira de la Rosa y Plaza de la Paz. Entrada libre hasta completar aforo.",
    dias: [
      {
        fecha: "Lunes 12 de octubre",
        eventos: [
          { hora: "09:00", evento: "Acreditación de delegaciones de danza", lugar: "Hall Teatro Amira de la Rosa" },
          { hora: "14:00", evento: "Prueba de tarima y sonido", lugar: "Teatro Amira de la Rosa" },
          { hora: "19:00", evento: "Gala de apertura — danza folclórica", lugar: "Teatro Amira de la Rosa" }
        ]
      },
      {
        fecha: "Martes 13 de octubre",
        eventos: [
          { hora: "10:00", evento: "Taller: cuerpo y territorio", lugar: "Sala de ensayo 2, Universidad del Atlántico" },
          { hora: "16:00", evento: "Muestra de danza contemporánea — Bloque A", lugar: "Teatro Amira de la Rosa" },
          { hora: "20:00", evento: "Muestra de danza contemporánea — Bloque B", lugar: "Teatro Amira de la Rosa" }
        ]
      },
      {
        fecha: "Miércoles 14 de octubre",
        eventos: [
          { hora: "11:00", evento: "Conversatorio con jurados", lugar: "Auditorio Norte" },
          { hora: "18:00", evento: "Muestra de danza urbana", lugar: "Plaza de la Paz" }
        ]
      },
      {
        fecha: "Sábado 17 de octubre",
        eventos: [
          { hora: "17:00", evento: "Muestra final y entrega de reconocimientos", lugar: "Teatro Amira de la Rosa" }
        ]
      }
    ]
  },
  {
    id: "teatro",
    nombre: "Teatro",
    color: "#FFB300",
    resumen: "Sala, calle y narración oral",
    nota: "Las funciones de calle se realizan con lluvia o sol; consulta cambios de sede en Noticias.",
    dias: [
      {
        fecha: "Lunes 12 de octubre",
        eventos: [
          { hora: "10:00", evento: "Acreditación de grupos de teatro", lugar: "Casa del Carnaval" },
          { hora: "18:30", evento: "Función inaugural: obra invitada", lugar: "Teatro Municipal" }
        ]
      },
      {
        fecha: "Martes 13 de octubre",
        eventos: [
          { hora: "09:30", evento: "Laboratorio de dramaturgia estudiantil", lugar: "Casa del Carnaval" },
          { hora: "15:00", evento: "Funciones de sala — Bloque A", lugar: "Teatro Municipal" },
          { hora: "19:30", evento: "Funciones de sala — Bloque B", lugar: "Teatro Municipal" }
        ]
      },
      {
        fecha: "Jueves 15 de octubre",
        eventos: [
          { hora: "16:00", evento: "Teatro de calle: circuito Centro Histórico", lugar: "Paseo Bolívar" },
          { hora: "20:00", evento: "Noche de narración oral", lugar: "Patio Casa del Carnaval" }
        ]
      }
    ]
  },
  {
    id: "musica",
    nombre: "Música",
    color: "#00D19A",
    resumen: "Vocal, instrumental y ensambles",
    nota: "Cada delegación cuenta con 20 minutos de escenario y 15 de prueba de sonido.",
    dias: [
      {
        fecha: "Martes 13 de octubre",
        eventos: [
          { hora: "08:30", evento: "Pruebas técnicas de sonido", lugar: "Auditorio Universidad del Norte" },
          { hora: "17:00", evento: "Muestra vocal — solistas y dúos", lugar: "Auditorio Universidad del Norte" }
        ]
      },
      {
        fecha: "Miércoles 14 de octubre",
        eventos: [
          { hora: "10:00", evento: "Clase magistral: dirección de ensambles", lugar: "Sala de música" },
          { hora: "16:00", evento: "Muestra instrumental", lugar: "Auditorio Universidad del Norte" },
          { hora: "20:00", evento: "Concierto de agrupaciones tropicales", lugar: "Concha Acústica" }
        ]
      },
      {
        fecha: "Viernes 16 de octubre",
        eventos: [
          { hora: "19:00", evento: "Gran concierto de cierre", lugar: "Parque Cultural del Caribe" }
        ]
      }
    ]
  },
  {
    id: "visuales",
    nombre: "Artes visuales",
    color: "#4CC9F0",
    resumen: "Pintura, escultura, gráfica e instalación",
    nota: "La exposición permanece abierta toda la semana de 9:00 a 19:00.",
    dias: [
      {
        fecha: "Lunes 12 de octubre",
        eventos: [
          { hora: "08:00", evento: "Recepción y montaje de obras", lugar: "Sala de exposiciones MAMB" },
          { hora: "18:00", evento: "Inauguración de la exposición nacional", lugar: "Sala de exposiciones MAMB" }
        ]
      },
      {
        fecha: "Jueves 15 de octubre",
        eventos: [
          { hora: "10:00", evento: "Visita guiada con los artistas", lugar: "Sala de exposiciones MAMB" },
          { hora: "15:00", evento: "Taller de gráfica experimental", lugar: "Taller MAMB" }
        ]
      },
      {
        fecha: "Sábado 17 de octubre",
        eventos: [
          { hora: "11:00", evento: "Conversatorio de cierre y desmontaje", lugar: "Sala de exposiciones MAMB" }
        ]
      }
    ]
  },
  {
    id: "literatura",
    nombre: "Literatura",
    color: "#B26BFF",
    resumen: "Cuento, poesía y crónica",
    nota: "Las lecturas son abiertas al público y se transmiten por el canal del festival.",
    dias: [
      {
        fecha: "Miércoles 14 de octubre",
        eventos: [
          { hora: "09:00", evento: "Taller de escritura creativa", lugar: "Biblioteca Departamental" },
          { hora: "17:00", evento: "Lectura de cuento — primera ronda", lugar: "Sala Meira Delmar" }
        ]
      },
      {
        fecha: "Jueves 15 de octubre",
        eventos: [
          { hora: "11:00", evento: "Encuentro con autor invitado", lugar: "Sala Meira Delmar" },
          { hora: "18:00", evento: "Recital de poesía universitaria", lugar: "Terraza Biblioteca Departamental" }
        ]
      }
    ]
  },
  {
    id: "audiovisual",
    nombre: "Audiovisual",
    color: "#FF6B35",
    resumen: "Cortometraje, documental y fotografía",
    nota: "Proyecciones con cupo limitado; se recomienda llegar 20 minutos antes.",
    dias: [
      {
        fecha: "Martes 13 de octubre",
        eventos: [
          { hora: "14:00", evento: "Proyección: cortometraje de ficción", lugar: "Cinemateca del Caribe" }
        ]
      },
      {
        fecha: "Viernes 16 de octubre",
        eventos: [
          { hora: "10:00", evento: "Masterclass de dirección de fotografía", lugar: "Cinemateca del Caribe" },
          { hora: "15:00", evento: "Proyección: documental universitario", lugar: "Cinemateca del Caribe" },
          { hora: "19:00", evento: "Premiación y muestra de fotografía", lugar: "Foyer Cinemateca del Caribe" }
        ]
      }
    ]
  }
];

/* ------------------------------------------------------------
   3. NOTICIAS
------------------------------------------------------------ */
const NOTICIAS = [
  {
    imagen: "img/noticia-1.svg",
    fecha: "20 de agosto de 2026",
    etiqueta: "Convocatoria",
    titulo: "Se amplía el plazo de inscripción hasta el 30 de julio",
    resumen: "Las instituciones que aún no han cargado sus soportes tienen dos semanas adicionales para completar el registro de sus delegaciones.",
    url: "#noticias"
  },
  {
    imagen: "img/noticia-2.svg",
    fecha: "12 de agosto de 2026",
    etiqueta: "Sedes",
    titulo: "Barranquilla confirma cinco escenarios para la edición 2026",
    resumen: "El Teatro Amira de la Rosa, la Cinemateca del Caribe y el Parque Cultural del Caribe encabezan la lista de sedes oficiales.",
    url: "#noticias"
  },
  {
    imagen: "img/noticia-3.svg",
    fecha: "01 de agosto de 2026",
    etiqueta: "Formación",
    titulo: "Doce talleres gratuitos acompañarán la programación",
    resumen: "Dramaturgia, dirección de fotografía, gráfica experimental y dirección de ensambles hacen parte de la agenda académica.",
    url: "#noticias"
  }
];

/* ------------------------------------------------------------
   4. GALERÍA
------------------------------------------------------------ */
const GALERIA = [
  { src: "img/galeria-1.svg", alt: "Presentación de danza folclórica", pie: "Gala de apertura, edición 2025" },
  { src: "img/galeria-2.svg", alt: "Obra de teatro en sala", pie: "Funciones de sala, Teatro Municipal" },
  { src: "img/galeria-3.svg", alt: "Ensamble musical en concierto", pie: "Concierto de cierre" },
  { src: "img/galeria-4.svg", alt: "Exposición de artes visuales", pie: "Exposición nacional de artes visuales" },
  { src: "img/galeria-5.svg", alt: "Recital de poesía", pie: "Recital de poesía universitaria" },
  { src: "img/galeria-6.svg", alt: "Proyección de cortometrajes", pie: "Muestra audiovisual" }
];

/* ------------------------------------------------------------
   5. PATROCINADORES
------------------------------------------------------------ */
const PATROCINADORES = [
  { nombre: "ASCUN", logo: "img/patrocinador-1.svg", url: "https://ascun.org.co" },
  { nombre: "Ministerio de Educación", logo: "img/patrocinador-2.svg", url: "#" },
  { nombre: "Ministerio de las Culturas", logo: "img/patrocinador-3.svg", url: "#" },
  { nombre: "Alcaldía de Barranquilla", logo: "img/patrocinador-4.svg", url: "#" },
  { nombre: "Universidad anfitriona", logo: "img/patrocinador-5.svg", url: "#" },
  { nombre: "Aliado cultural", logo: "img/patrocinador-6.svg", url: "#" }
];
