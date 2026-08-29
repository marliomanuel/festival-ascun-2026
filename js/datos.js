/* ============================================================
   3er FESTIVAL NACIONAL UNIVERSITARIO ASCUN CULTURA
   Barranquilla, 18 al 24 de octubre de 2026

   ESTE ES EL ÚNICO ARCHIVO QUE NECESITAS EDITAR.
   No toques js/app.js salvo que quieras cambiar comportamiento.
   ============================================================ */

/* ------------------------------------------------------------
   0. ENLACES DE INSCRIPCIÓN (Acceso a Cayena)
   Cuando tengas el link de administradores, reemplaza el "#".
------------------------------------------------------------ */
const CAYENA = {
  instituciones: "https://script.google.com/macros/s/AKfycbyTaomPZwKkhOFq7C7pxQlDq7wPzwHruEBZoM6rYZVCoytm-Ww7TLnk5nOTd7tq9a4/exec",
  administradores: "#"
};

/* ------------------------------------------------------------
   1. SLIDER
   tipo: "imagen" o "video". Las imágenes van en la carpeta img/
------------------------------------------------------------ */
const SLIDES = [
  {
    tipo: "imagen",
    src: "img/slide-1.jpg",
    alt: "Delegación de danza folclórica en tarima",
    rotulo: "18 al 24 de octubre de 2026 · Barranquilla",
    titulo: "3er Festival Nacional Universitario ASCUN Cultura",
    texto: "Doce festivales, una semana y el talento artístico de las universidades de todo el país.",
    enlace: { texto: "Ver agendas", url: "#agendas" }
  },
  {
    tipo: "imagen",
    src: "img/slide-2.jpg",
    alt: "Gala de parejas de salsa y bachata ante el jurado",
    rotulo: "Plataforma habilitada",
    titulo: "Inscribe tu delegación en Cayena",
    texto: "Las IES registran su participación hasta el viernes 11 de septiembre de 2026.",
    enlace: { texto: "Acceso instituciones", url: CAYENA.instituciones, externo: true }
  }
];

/* ------------------------------------------------------------
   2. BLOQUE DE APERTURA
   Es común a los doce festivales (domingo 18 de octubre).
   Si cambia una hora, la cambias aquí una sola vez.
------------------------------------------------------------ */
const APERTURA = [
  { hora: "08:00", evento: "Llegada de delegaciones a la ciudad de Barranquilla", lugar: "Ciudad de Barranquilla" },
  { hora: "14:00", evento: "Recepción y acto inaugural", lugar: "Coliseo Elías Chegwin — Universidad del Norte" },
  { hora: "15:00", evento: "Entrega de escarapelas", lugar: "Coliseo Elías Chegwin — Universidad del Norte" },
  { hora: "16:00", evento: "Componente académico", lugar: "Coliseo Elías Chegwin — Universidad del Norte" },
  { hora: "17:00", evento: "Integración", lugar: "Coliseo Elías Chegwin — Universidad del Norte" }
];
const DIA_APERTURA = { fecha: "Domingo 18 de octubre de 2026", eventos: APERTURA };

/* ------------------------------------------------------------
   3. AGENDAS POR FESTIVAL
   Cada categoría es un botón de color en la botonera.
   Fuente: Circular No. 02 del 11 de agosto de 2026.
------------------------------------------------------------ */
const AGENDAS = [
  {
    id: "narracion-oral",
    nombre: "Narración Oral",
    color: "#F18700",
    resumen: "3 días de programación",
    nota: "Escenarios: Casa de la Cultura de América Latina «La Perla» / Salón de Agua - MAUA, Universidad del Atlántico, Sede Bellas Artes.",
    dias: [
      DIA_APERTURA,
      { fecha: "Lunes 19 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Galas de presentaciones — Grupo A", lugar: "Casa de la Cultura «La Perla» / Salón de Agua - MAUA" },
        { hora: "14:00", evento: "Reunión de retroalimentación con los participantes del Grupo A", lugar: "Casa de la Cultura «La Perla» / Salón de Agua - MAUA" }
      ]},
      { fecha: "Martes 20 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Galas de presentaciones — Grupo B", lugar: "Casa de la Cultura «La Perla» / Salón de Agua - MAUA" },
        { hora: "14:00", evento: "Reunión de retroalimentación con los participantes del Grupo B", lugar: "Casa de la Cultura «La Perla» / Salón de Agua - MAUA" },
        { hora: "17:00", evento: "Premiación", lugar: "Casa de la Cultura «La Perla» / Salón de Agua - MAUA" }
      ]},
      { fecha: "Miércoles 21 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Salida de delegaciones", lugar: "Ciudad de Barranquilla" }
      ]}
    ]
  },
  {
    id: "teatro",
    nombre: "Teatro",
    color: "#E30613",
    resumen: "6 días de programación",
    nota: "Escenario: Teatro Bellas Artes — Universidad del Atlántico, sede Bellas Artes.",
    dias: [
      DIA_APERTURA,
      { fecha: "Lunes 19 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Obra 1", lugar: "Teatro Bellas Artes" },
        { hora: "11:00", evento: "Obra 2", lugar: "Teatro Bellas Artes" },
        { hora: "14:00", evento: "Obra 3", lugar: "Teatro Bellas Artes" },
        { hora: "17:00", evento: "Obra 4", lugar: "Teatro Bellas Artes" }
      ]},
      { fecha: "Martes 20 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Obra 5", lugar: "Teatro Bellas Artes" },
        { hora: "11:00", evento: "Obra 6", lugar: "Teatro Bellas Artes" },
        { hora: "14:00", evento: "Obra 7", lugar: "Teatro Bellas Artes" },
        { hora: "17:00", evento: "Obra 8", lugar: "Teatro Bellas Artes" }
      ]},
      { fecha: "Miércoles 21 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Obra 9", lugar: "Teatro Bellas Artes" },
        { hora: "11:00", evento: "Obra 10", lugar: "Teatro Bellas Artes" },
        { hora: "14:00", evento: "Obra 11", lugar: "Teatro Bellas Artes" },
        { hora: "17:00", evento: "Obra 12", lugar: "Teatro Bellas Artes" }
      ]},
      { fecha: "Jueves 22 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Obra 13", lugar: "Teatro Bellas Artes" },
        { hora: "14:00", evento: "Premiación", lugar: "Teatro Bellas Artes" }
      ]},
      { fecha: "Viernes 23 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Salida de delegaciones", lugar: "Ciudad de Barranquilla" }
      ]}
    ]
  },
  {
    id: "coros",
    nombre: "Coros",
    color: "#662D91",
    resumen: "4 días de programación",
    nota: "Escenarios: Auditorio Jorge Artel — Universidad Simón Bolívar / Salón Pedro Biava — Universidad del Atlántico, Sede Bellas Artes.",
    dias: [
      DIA_APERTURA,
      { fecha: "Lunes 19 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Ensayo de la masa coral «La invitación» de Jorge Celedón y Jimmy Zambrano", lugar: "Auditorio Jorge Artel — Universidad Simón Bolívar" },
        { hora: "14:00", evento: "Gala privada ante el jurado", lugar: "Salón Pedro Biava — Universidad del Atlántico, Sede Bellas Artes" }
      ]},
      { fecha: "Martes 20 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Ensayo de la masa coral «La invitación» de Jorge Celedón y Jimmy Zambrano", lugar: "Auditorio Jorge Artel — Universidad Simón Bolívar" },
        { hora: "14:00", evento: "Gala pública", lugar: "Auditorio Jorge Artel — Universidad Simón Bolívar" },
        { hora: "15:00", evento: "Presentación de la masa coral", lugar: "Auditorio Jorge Artel — Universidad Simón Bolívar" },
        { hora: "16:00", evento: "Premiación", lugar: "Auditorio Jorge Artel — Universidad Simón Bolívar" }
      ]},
      { fecha: "Miércoles 21 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Salida de delegaciones", lugar: "Ciudad de Barranquilla" }
      ]}
    ]
  },
  {
    id: "danza-folclorica",
    nombre: "Danzas Folclóricas",
    color: "#00953B",
    resumen: "5 días de programación",
    nota: "Escenario principal: Teatro José Consuegra Higgins. El desfile y la premiación se realizan en el Malecón del Río.",
    dias: [
      DIA_APERTURA,
      { fecha: "Lunes 19 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Sustentación de trabajos", lugar: "Centro de Convenciones — Universidad del Atlántico, Sede Norte" },
        { hora: "14:00", evento: "Sustentación de trabajos", lugar: "Centro de Convenciones — Universidad del Atlántico, Sede Norte" }
      ]},
      { fecha: "Martes 20 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Reconocimiento y marcación del espacio", lugar: "Teatro José Consuegra Higgins" },
        { hora: "14:00", evento: "Gala central — Grupo 1 de danzas", lugar: "Teatro José Consuegra Higgins" }
      ]},
      { fecha: "Miércoles 21 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Gala central — Grupo 2 de danzas", lugar: "Teatro José Consuegra Higgins" },
        { hora: "14:00", evento: "Desfile y danza opcional", lugar: "Malecón del Río" },
        { hora: "18:00", evento: "Premiación", lugar: "Malecón del Río" }
      ]},
      { fecha: "Jueves 22 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Salida de delegaciones", lugar: "Ciudad de Barranquilla" }
      ]}
    ]
  },
  {
    id: "musica-tradicional",
    nombre: "Música Tradicional Colombiana",
    color: "#007A8A",
    resumen: "2 días de programación",
    nota: "Escenario: Casa de la Cultura de América Latina «La Perla».",
    dias: [
      DIA_APERTURA,
      { fecha: "Lunes 19 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Prueba de sonido", lugar: "Casa de la Cultura de América Latina «La Perla»" },
        { hora: "14:00", evento: "Gala de presentaciones", lugar: "Casa de la Cultura de América Latina «La Perla»" }
      ]},
      { fecha: "Martes 20 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Salida de delegaciones", lugar: "Ciudad de Barranquilla" }
      ]}
    ]
  },
  {
    id: "salsa-bachata",
    nombre: "Salsa y Bachata",
    color: "#D6006D",
    resumen: "4 días de programación",
    nota: "Escenario: Teatro José Consuegra Higgins.",
    dias: [
      DIA_APERTURA,
      { fecha: "Lunes 19 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Reconocimiento del espacio y marcación", lugar: "Teatro José Consuegra Higgins" },
        { hora: "14:00", evento: "Gala de grupos de salsa y gala de grupo de bachata", lugar: "Teatro José Consuegra Higgins" }
      ]},
      { fecha: "Martes 20 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Reconocimiento del espacio y marcación", lugar: "Teatro José Consuegra Higgins" },
        { hora: "14:00", evento: "Gala de parejas de salsa y gala de parejas de bachata", lugar: "Teatro José Consuegra Higgins" }
      ]},
      { fecha: "Miércoles 21 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Salida de delegaciones", lugar: "Ciudad de Barranquilla" }
      ]}
    ]
  },
  {
    id: "danzas-urbanas",
    nombre: "Danzas Urbanas",
    color: "#95C11F",
    resumen: "4 días de programación",
    nota: "Escenario: La Fábrica de Cultura — Secretaría Distrital de Cultura.",
    dias: [
      DIA_APERTURA,
      { fecha: "Lunes 19 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Reconocimiento del espacio y marcación", lugar: "La Fábrica de Cultura — Secretaría Distrital de Cultura" },
        { hora: "14:00", evento: "Gala de grupos de danzas urbanas", lugar: "La Fábrica de Cultura — Secretaría Distrital de Cultura" }
      ]},
      { fecha: "Martes 20 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Reconocimiento del espacio y marcación", lugar: "La Fábrica de Cultura — Secretaría Distrital de Cultura" },
        { hora: "14:00", evento: "Gala de grupos de danzas urbanas", lugar: "La Fábrica de Cultura — Secretaría Distrital de Cultura" }
      ]},
      { fecha: "Miércoles 21 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Salida de delegaciones", lugar: "Ciudad de Barranquilla" }
      ]}
    ]
  },
  {
    id: "artes-plasticas",
    nombre: "Artes Plásticas",
    color: "#316BB2",
    resumen: "4 días de programación",
    nota: "Escenario: Museo Bolivariano — Universidad Simón Bolívar.",
    dias: [
      DIA_APERTURA,
      { fecha: "Lunes 19 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Sustentación de obras — Grupo 1", lugar: "Museo Bolivariano — Universidad Simón Bolívar" },
        { hora: "14:00", evento: "Exposición de la obra", lugar: "Museo Bolivariano — Universidad Simón Bolívar" }
      ]},
      { fecha: "Martes 20 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Sustentación de obras — Grupo 2", lugar: "Museo Bolivariano — Universidad Simón Bolívar" },
        { hora: "14:00", evento: "Exposición de la obra", lugar: "Museo Bolivariano — Universidad Simón Bolívar" }
      ]},
      { fecha: "Miércoles 21 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Salida de delegaciones", lugar: "Ciudad de Barranquilla" }
      ]}
    ]
  },
  {
    id: "rock",
    nombre: "Rock",
    color: "#4A4A55",
    resumen: "3 días de programación",
    nota: "Escenario: Auditorio de la Universidad de la Costa.",
    dias: [
      DIA_APERTURA,
      { fecha: "Lunes 19 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Prueba de sonido de grupos de rock", lugar: "Auditorio de la Universidad de la Costa" },
        { hora: "14:00", evento: "Gala de grupos de rock", lugar: "Auditorio de la Universidad de la Costa" }
      ]},
      { fecha: "Martes 20 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Salida de delegaciones", lugar: "Ciudad de Barranquilla" }
      ]}
    ]
  },
  {
    id: "orquesta-fusion",
    nombre: "Orquesta y Grupo Fusión",
    color: "#00A9A5",
    resumen: "4 días de programación",
    nota: "Escenario: Teatro Mario Ceballos — Universidad Autónoma del Caribe.",
    dias: [
      DIA_APERTURA,
      { fecha: "Lunes 19 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Prueba de sonido — Grupo Fusión", lugar: "Teatro Mario Ceballos — Universidad Autónoma del Caribe" },
        { hora: "14:00", evento: "Gala de Grupo Fusión", lugar: "Teatro Mario Ceballos — Universidad Autónoma del Caribe" }
      ]},
      { fecha: "Martes 20 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Prueba de sonido — Orquesta", lugar: "Teatro Mario Ceballos — Universidad Autónoma del Caribe" },
        { hora: "14:00", evento: "Galas de presentaciones — Orquesta", lugar: "Teatro Mario Ceballos — Universidad Autónoma del Caribe" }
      ]},
      { fecha: "Miércoles 21 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Salida de delegaciones", lugar: "Ciudad de Barranquilla" }
      ]}
    ]
  },
  {
    id: "cancion",
    nombre: "Canción",
    color: "#E5A000",
    resumen: "4 días de programación",
    nota: "Escenario: Auditorio de la Universidad de la Costa. El primer ensayo se realiza en el Estudio de música.",
    dias: [
      DIA_APERTURA,
      { fecha: "Lunes 19 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Ensayo con la banda — Intérpretes femeninas", lugar: "Estudio de música — Universidad de la Costa" },
        { hora: "18:00", evento: "Gala de intérpretes femeninas", lugar: "Auditorio de la Universidad de la Costa" }
      ]},
      { fecha: "Martes 20 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Ensayo con la banda — Intérpretes masculinos", lugar: "Auditorio de la Universidad de la Costa" },
        { hora: "14:00", evento: "Gala de intérpretes masculinos", lugar: "Auditorio de la Universidad de la Costa" }
      ]},
      { fecha: "Miércoles 21 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Ensayo con la banda — Canción inédita", lugar: "Auditorio de la Universidad de la Costa" },
        { hora: "14:00", evento: "Gala de canción inédita", lugar: "Auditorio de la Universidad de la Costa" }
      ]},
      { fecha: "Jueves 22 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Salida de delegaciones", lugar: "Ciudad de Barranquilla" }
      ]}
    ]
  },
  {
    id: "vallenato",
    nombre: "Vallenato",
    color: "#0A367E",
    resumen: "3 días de programación",
    nota: "Escenario: Teatro Mario Ceballos — Universidad Autónoma del Caribe.",
    dias: [
      DIA_APERTURA,
      { fecha: "Lunes 19 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Prueba de sonido — Vallenato", lugar: "Teatro Mario Ceballos — Universidad Autónoma del Caribe" },
        { hora: "14:00", evento: "Gala de presentación — Grupo típico y canción inédita vallenata", lugar: "Teatro Mario Ceballos — Universidad Autónoma del Caribe" }
      ]},
      { fecha: "Martes 20 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Prueba de sonido — Vallenato", lugar: "Teatro Mario Ceballos — Universidad Autónoma del Caribe" },
        { hora: "14:00", evento: "Gala de presentación — Agrupación vallenata", lugar: "Teatro Mario Ceballos — Universidad Autónoma del Caribe" }
      ]},
      { fecha: "Miércoles 21 de octubre de 2026", eventos: [
        { hora: "08:00", evento: "Salida de delegaciones", lugar: "Ciudad de Barranquilla" }
      ]}
    ]
  }
];

/* ------------------------------------------------------------
   4. CIRCULARES
   Los PDF van en la carpeta docs/
------------------------------------------------------------ */
const CIRCULARES = [
  {
    numero: "Circular 001",
    titulo: "Convocatoria de participación",
    fecha: "14 de julio de 2026",
    resumen: "Convocatoria, cupos por modalidad de cada nodo regional, tarifas de inscripción y calendario administrativo del festival.",
    archivo: "docs/circular-01-convocatoria.pdf"
  },
  {
    numero: "Circular 002",
    titulo: "Agendas generales",
    fecha: "11 de agosto de 2026",
    resumen: "Agenda de programación de los doce festivales, con fechas, horas y escenarios de cada actividad.",
    archivo: "docs/circular-02-agendas.pdf"
  },
  {
    numero: "Circular 003",
    titulo: "Habilitación de plataforma de inscripciones",
    fecha: "27 de agosto de 2026",
    resumen: "Apertura de la plataforma Cayena, fechas límite de inscripción y aspectos generales de participación.",
    archivo: "docs/circular-03-plataforma.pdf"
  }
];

/* ------------------------------------------------------------
   5. GALERÍA
   Agrega más fotos copiándolas a img/ y añadiendo una línea.
------------------------------------------------------------ */
const GALERIA = [
  { src: "img/galeria-1.jpg", alt: "Delegación de danza folclórica en tarima", pie: "Gala de danzas folclóricas" },
  { src: "img/galeria-2.jpg", alt: "Gala de parejas de salsa y bachata ante el jurado", pie: "Gala ante el jurado — parejas de salsa y bachata" }
];

/* ------------------------------------------------------------
   5b. REGLAMENTO GENERAL
   "pagina" es la página del PDF donde arranca cada capítulo:
   el enlace abre el documento directamente en ese punto.
------------------------------------------------------------ */
const REGLAMENTO = {
  titulo: "Reglamento General ASCUN Cultura",
  version: "Versión del 7 de mayo de 2026",
  descripcion: "Reglamento de los festivales regionales y nacionales universitarios del área temática de cultura de la Asociación Colombiana de Universidades. Incluye disposiciones generales y un capítulo por cada festival, con requisitos de participación, categorías, tiempos de presentación y criterios de evaluación.",
  paginas: 79,
  archivo: "docs/reglamento-general-ascun-cultura.pdf",
  capitulos: [
    { numero: "Capítulo 1", nombre: "Festival de la Canción", pagina: 8 },
    { numero: "Capítulo 2", nombre: "Festival de Coros", pagina: 14 },
    { numero: "Capítulo 3", nombre: "Festival de Música Tradicional Colombiana", pagina: 19 },
    { numero: "Capítulo 4", nombre: "Festival de Orquesta Tropical y Grupo Fusión", pagina: 24 },
    { numero: "Capítulo 5", nombre: "Festival de Rock", pagina: 29 },
    { numero: "Capítulo 6", nombre: "Festival de Vallenato", pagina: 33 },
    { numero: "Capítulo 7", nombre: "Festival de Danzas Contemporáneas y del Mundo", pagina: 40 },
    { numero: "Capítulo 8", nombre: "Festival de Danzas Folclóricas Colombianas", pagina: 46 },
    { numero: "Capítulo 9", nombre: "Festival de Danzas Urbanas", pagina: 54 },
    { numero: "Capítulo 10", nombre: "Festival de Salsa y Bachata", pagina: 60 },
    { numero: "Capítulo 11", nombre: "Festival de Narración Oral", pagina: 65 },
    { numero: "Capítulo 12", nombre: "Festival de Teatro", pagina: 69 },
    { numero: "Capítulo 13", nombre: "Festival de Artes Plásticas y Visuales", pagina: 74 }
  ]
};

/* ------------------------------------------------------------
   6. FECHAS CLAVE DE INSCRIPCIÓN (Circular 003)
------------------------------------------------------------ */
const FECHAS = [
  { actividad: "Apertura de plataforma de inscripción y fichas técnicas", limite: "Jueves 27 de agosto de 2026", responsable: "Comité Nacional y Comité Organizador" },
  { actividad: "Entrega de clasificados", limite: "Martes 1 de septiembre de 2026", responsable: "Comité de Cultura de Nodos" },
  { actividad: "Cierre de fichas técnicas de Canción", limite: "Martes 1 de septiembre de 2026", responsable: "Comité Nacional y Comité Organizador" },
  { actividad: "Cierre de plataforma de inscripción y fichas técnicas", limite: "Viernes 11 de septiembre de 2026", responsable: "Comité Nacional y Comité Organizador" },
  { actividad: "Entrega de planillas de inscripción firmadas", limite: "Viernes 2 de octubre de 2026", responsable: "Coordinadores de cultura de cada IES" }
];

/* ------------------------------------------------------------
   7. TARIFAS DE INSCRIPCIÓN (Circular 001)
------------------------------------------------------------ */
const TARIFAS = [
  { modalidad: "Intérprete femenino", tipo: "Por participante", asociadas: "$ 650.000", noAsociadas: "$ 750.000" },
  { modalidad: "Intérprete masculino", tipo: "Por participante", asociadas: "$ 650.000", noAsociadas: "$ 750.000" },
  { modalidad: "Mejor creación original", tipo: "Por participante", asociadas: "$ 650.000", noAsociadas: "$ 750.000" },
  { modalidad: "Pintura", tipo: "Por participante", asociadas: "$ 603.000", noAsociadas: "$ 704.000" },
  { modalidad: "Fotografía", tipo: "Por participante", asociadas: "$ 603.000", noAsociadas: "$ 704.000" },
  { modalidad: "Dibujo", tipo: "Por participante", asociadas: "$ 603.000", noAsociadas: "$ 704.000" },
  { modalidad: "Coros", tipo: "Por grupo", asociadas: "$ 1.400.000", noAsociadas: "$ 1.620.000" },
  { modalidad: "Danzas urbanas", tipo: "Por grupo", asociadas: "$ 1.400.000", noAsociadas: "$ 1.620.000" },
  { modalidad: "Salsa y bachata", tipo: "Por grupo", asociadas: "$ 1.400.000", noAsociadas: "$ 1.620.000" },
  { modalidad: "Salsa y bachata", tipo: "Por pareja", asociadas: "$ 720.000", noAsociadas: "$ 840.000" },
  { modalidad: "Danza folclórica", tipo: "Por grupo", asociadas: "$ 2.420.000", noAsociadas: "$ 2.660.000" },
  { modalidad: "Teatro", tipo: "Por grupo", asociadas: "$ 2.420.000", noAsociadas: "$ 2.660.000" },
  { modalidad: "Narración oral", tipo: "Por participante", asociadas: "$ 603.000", noAsociadas: "$ 704.000" },
  { modalidad: "Orquesta", tipo: "Por grupo", asociadas: "$ 1.600.000", noAsociadas: "$ 1.820.000" },
  { modalidad: "Grupo fusión", tipo: "Por grupo", asociadas: "$ 1.400.000", noAsociadas: "$ 1.620.000" },
  { modalidad: "Rock", tipo: "Por grupo", asociadas: "$ 1.400.000", noAsociadas: "$ 1.620.000" },
  { modalidad: "Agrupación vallenata", tipo: "Por grupo", asociadas: "$ 1.400.000", noAsociadas: "$ 1.620.000" },
  { modalidad: "Grupo típico vallenato", tipo: "Por grupo", asociadas: "$ 860.000", noAsociadas: "$ 1.048.000" },
  { modalidad: "Canción inédita vallenata", tipo: "Por participante", asociadas: "$ 603.000", noAsociadas: "$ 704.000" },
  { modalidad: "Música tradicional colombiana", tipo: "Por grupo", asociadas: "$ 1.400.000", noAsociadas: "$ 1.620.000" }
];

/* ------------------------------------------------------------
   8. ORGANIZADORES Y ALIADOS
------------------------------------------------------------ */
const PATROCINADORES = [
  { nombre: "ASCUN — ASCUN Cultura", logo: "img/ascun-cultura.png", url: "https://ascun.org.co" }
];
