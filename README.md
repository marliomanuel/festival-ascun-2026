# Festival Nacional Universitario 2026 · ASCUN

Sitio estático (HTML + CSS + JavaScript, sin frameworks ni build) listo para publicar en Vercel.

## Estructura

```
festival-ascun-2026/
├── index.html              ← estructura de la página
├── css/estilos.css         ← todo el diseño
├── js/datos.js             ← ⭐ CONTENIDO EDITABLE (slider, agendas, noticias, galería, patrocinadores)
├── js/app.js               ← comportamiento (slider, popup, menú, galería)
├── img/                    ← imágenes provisionales en SVG (reemplázalas)
├── docs/                   ← PDF de reglamentos y políticas (reemplázalos)
└── generar_imagenes.py     ← script opcional que creó los SVG provisionales
```

## Qué editar primero

| Quiero cambiar | Voy a |
|---|---|
| El link del botón de inscripción | `index.html` → busca `inscripciones.ejemplo.com` (aparece 3 veces: menú, slider y pie) |
| Fotos del slider, título, textos | `js/datos.js` → `SLIDES` |
| Categorías, colores y eventos de las agendas | `js/datos.js` → `AGENDAS` |
| Noticias | `js/datos.js` → `NOTICIAS` |
| Galería | `js/datos.js` → `GALERIA` |
| Logos de patrocinadores | `js/datos.js` → `PATROCINADORES` |
| Fechas, ciudad, número de delegaciones | `index.html` → sección `festival` |
| Reglamentos y políticas | reemplaza los PDF en `docs/` |
| Colores base | `css/estilos.css` → bloque `:root` |

### Agregar una categoría a la agenda

En `js/datos.js`, copia un bloque completo dentro de `AGENDAS` y cambia `id`, `nombre`, `color` y los días.
El botón de la botonera y su popup se generan solos.

```js
{
  id: "nueva",
  nombre: "Nombre de la categoría",
  color: "#00D19A",
  resumen: "Texto corto bajo el nombre",
  nota: "Aclaración que aparece en el popup",
  dias: [
    { fecha: "Lunes 12 de octubre", eventos: [
      { hora: "09:00", evento: "Nombre del evento", lugar: "Sede" }
    ]}
  ]
}
```

### Poner un video en el slider

Copia el `.mp4` en `img/` y agrega una diapositiva:

```js
{ tipo: "video", src: "img/promo.mp4", poster: "img/slide-1.svg",
  alt: "Video promocional", titulo: "Así se vivió 2025" }
```

El slider espera a que el video termine antes de pasar a la siguiente.

### Reemplazar las imágenes

Los SVG de `img/` son provisionales. Sube tus JPG/WebP con el mismo nombre (o cambia la ruta en `datos.js`).
Tamaños recomendados: slider 1600×900, noticias 800×500, galería 900×675, logos con fondo transparente.

## Probar en tu computador

```bash
cd festival-ascun-2026
python3 -m http.server 8000
```

Abre `http://localhost:8000`. (No abras `index.html` con doble clic: algunas cosas fallan con `file://`.)

## Publicar en Vercel

### Opción A — GitHub (recomendada, actualiza sola)

1. Crea una cuenta en <https://vercel.com> con "Continue with GitHub".
2. Crea un repositorio en GitHub, por ejemplo `festival-ascun-2026`.
3. Sube la carpeta:
   ```bash
   cd festival-ascun-2026
   git init
   git add .
   git commit -m "Sitio del festival"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/festival-ascun-2026.git
   git push -u origin main
   ```
4. En Vercel: **Add New… → Project → Import** el repositorio.
5. Framework Preset: **Other**. Deja Build Command y Output Directory vacíos (es HTML puro).
6. **Deploy**. En menos de un minuto tienes `https://festival-ascun-2026.vercel.app`.
7. Cada `git push` vuelve a publicar automáticamente.

### Opción B — Vercel CLI (sin GitHub)

```bash
npm i -g vercel
cd festival-ascun-2026
vercel login
vercel          # despliegue de prueba
vercel --prod   # despliegue definitivo
```

### Dominio propio

Vercel → tu proyecto → **Settings → Domains → Add**. Si compras `festivalascun.com`, apunta en tu
proveedor de dominio los registros que Vercel te indique (normalmente un `A` a `76.76.21.21` y un `CNAME`
`www` → `cname.vercel-dns.com`). El certificado HTTPS lo emite Vercel gratis.

## Nota sobre el plan gratuito

El plan **Hobby** de Vercel es gratuito pero está pensado para proyectos personales y no comerciales.
Un sitio institucional de ASCUN con tráfico alto o con patrocinadores puede requerir el plan **Pro**
(USD 20/mes por usuario). Para lanzar, probar y mostrar la propuesta, Hobby funciona perfecto.
