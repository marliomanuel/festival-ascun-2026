# 3er Festival Nacional Universitario ASCUN Cultura — Barranquilla 2026

Sitio estático (HTML + CSS + JavaScript, sin frameworks ni compilación) listo para Vercel.

## Estructura

```
festival-ascun-2026/
├── index.html              ← estructura y menú
├── css/estilos.css         ← diseño (paleta ASCUN en el bloque :root)
├── js/datos.js             ← ⭐ TODO EL CONTENIDO EDITABLE
├── js/app.js               ← comportamiento (no hace falta tocarlo)
├── img/                    ← logo, fotos del slider y galería
└── docs/                   ← circulares en PDF
```

## Qué edito y dónde (todo en js/datos.js)

| Quiero cambiar | Bloque en datos.js |
|---|---|
| Link de Cayena para administradores | `CAYENA.administradores` (hoy dice `"#"`) |
| Link de Cayena para instituciones | `CAYENA.instituciones` |
| Fotos y textos del slider | `SLIDES` |
| Agendas de los 12 festivales | `AGENDAS` |
| Hora o lugar del acto inaugural | `APERTURA` (cambia una vez y aplica a los 12) |
| Circulares (agregar la 004) | `CIRCULARES` + subir el PDF a `docs/` |
| Fotos de la galería | `GALERIA` + subir las fotos a `img/` |
| Fechas límite de inscripción | `FECHAS` |
| Tarifas por modalidad | `TARIFAS` |
| Logos de organizadores y aliados | `PATROCINADORES` |
| Colores de la paleta | `css/estilos.css`, bloque `:root` |

La sección **Premiación** no se edita: se arma sola buscando el evento "Premiación"
dentro de cada agenda. Si un festival aún no la tiene, aparece como "por confirmar".

### Agregar una circular

```js
{
  numero: "Circular 004",
  titulo: "Título de la circular",
  fecha: "15 de septiembre de 2026",
  resumen: "De qué trata.",
  archivo: "docs/circular-04-nombre.pdf"
}
```
Sube el PDF a `docs/` con ese mismo nombre. También agrégala al submenú
CIRCULARES en `index.html` si quieres que aparezca ahí.

### Agregar fotos a la galería

Sube las fotos a `img/` (JPG, máximo 1800 px de ancho) y añade una línea:

```js
{ src: "img/galeria-3.jpg", alt: "Descripción de la foto", pie: "Texto que aparece al pasar el mouse" }
```

### Poner un video en el slider

```js
{ tipo: "video", src: "img/promo.mp4", poster: "img/slide-1.jpg",
  alt: "Video promocional", titulo: "3er Festival Nacional Universitario" }
```

## Probar en tu computador

```bash
python3 -m http.server 8000
```
Abre `http://localhost:8000`. No abras index.html con doble clic.

## Publicar los cambios

Edita el archivo en GitHub → **Commit changes** → Vercel republica solo en menos de un minuto.
