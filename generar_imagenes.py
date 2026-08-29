import os, random, math

DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "img")
os.makedirs(DIR, exist_ok=True)

NOCHE = "#150F2E"
COLORES = ["#FF2E7E", "#FFB300", "#00D19A", "#4CC9F0", "#B26BFF", "#FF6B35"]

def escribir(nombre, contenido):
    with open(os.path.join(DIR, nombre), "w", encoding="utf-8") as f:
        f.write(contenido)

def poster(w, h, semilla, etiqueta, colores):
    r = random.Random(semilla)
    p = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">']
    p.append(f'<rect width="{w}" height="{h}" fill="{NOCHE}"/>')
    p.append('<g opacity="0.9">')
    for i in range(14):
        c = r.choice(colores)
        forma = r.choice(["circulo", "arco", "barra", "triangulo"])
        cx, cy = r.uniform(0, w), r.uniform(0, h)
        s = r.uniform(w * 0.08, w * 0.34)
        op = round(r.uniform(0.18, 0.6), 2)
        if forma == "circulo":
            p.append(f'<circle cx="{cx:.0f}" cy="{cy:.0f}" r="{s/2:.0f}" fill="{c}" opacity="{op}"/>')
        elif forma == "arco":
            p.append(f'<path d="M{cx:.0f} {cy:.0f} a{s/2:.0f} {s/2:.0f} 0 0 1 {s:.0f} 0" fill="none" stroke="{c}" stroke-width="{s*0.13:.0f}" opacity="{op}"/>')
        elif forma == "barra":
            p.append(f'<rect x="{cx:.0f}" y="{cy:.0f}" width="{s:.0f}" height="{s*0.16:.0f}" rx="{s*0.08:.0f}" fill="{c}" opacity="{op}"/>')
        else:
            p.append(f'<path d="M{cx:.0f} {cy:.0f} L{cx+s:.0f} {cy:.0f} L{cx+s/2:.0f} {cy-s*0.8:.0f} Z" fill="{c}" opacity="{op}"/>')
    p.append("</g>")
    # trama de líneas
    for x in range(0, w, 46):
        p.append(f'<line x1="{x}" y1="0" x2="{x}" y2="{h}" stroke="#F3EEFF" stroke-opacity="0.05" stroke-width="1"/>')
    p.append(f'<rect width="{w}" height="{h}" fill="url(#g{semilla})"/>')
    p.append(f'<defs><linearGradient id="g{semilla}" x1="0" y1="0" x2="0" y2="1">'
             f'<stop offset="0" stop-color="{NOCHE}" stop-opacity="0.05"/>'
             f'<stop offset="1" stop-color="{NOCHE}" stop-opacity="0.75"/></linearGradient></defs>')
    p.append(f'<text x="{w/2:.0f}" y="{h-26:.0f}" text-anchor="middle" font-family="monospace" font-size="{max(12, w*0.016):.0f}" '
             f'fill="#F3EEFF" fill-opacity="0.5" letter-spacing="4">{etiqueta}</text>')
    p.append("</svg>")
    return "\n".join(p)

# Slides
for i in range(1, 4):
    escribir(f"slide-{i}.svg", poster(1600, 900, 10 + i, f"IMAGEN PROVISIONAL · SLIDE {i}", COLORES))

# Noticias
for i in range(1, 4):
    escribir(f"noticia-{i}.svg", poster(800, 500, 30 + i, f"NOTICIA {i}", [COLORES[(i + 2) % 6], COLORES[(i + 4) % 6]]))

# Galeria
for i in range(1, 7):
    escribir(f"galeria-{i}.svg", poster(900, 675, 50 + i, f"GALERIA {i}", [COLORES[i % 6], COLORES[(i + 3) % 6]]))

# Logo
logo = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" rx="24" fill="{NOCHE}"/>
  <circle cx="50" cy="50" r="34" fill="none" stroke="#FF2E7E" stroke-width="5"/>
  <path d="M20 62 Q50 18 80 62" fill="none" stroke="#FFB300" stroke-width="5" stroke-linecap="round"/>
  <path d="M20 74 Q50 30 80 74" fill="none" stroke="#00D19A" stroke-width="5" stroke-linecap="round" opacity="0.85"/>
  <circle cx="50" cy="42" r="7" fill="#4CC9F0"/>
</svg>'''
escribir("logo.svg", logo)
escribir("favicon.svg", logo)

# Patrocinadores (marcas provisionales)
nombres = ["ASCUN", "MINEDUCACION", "MINCULTURAS", "ALCALDIA", "UNIVERSIDAD", "ALIADO"]
for i, n in enumerate(nombres, start=1):
    ancho = 150 + len(n) * 11
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {ancho} 60" width="{ancho}" height="60">
  <rect x="1" y="1" width="{ancho-2}" height="58" rx="10" fill="none" stroke="#F3EEFF" stroke-opacity="0.35"/>
  <circle cx="30" cy="30" r="11" fill="{COLORES[(i-1) % 6]}"/>
  <text x="52" y="36" font-family="Archivo, Arial, sans-serif" font-size="17" font-weight="600" fill="#F3EEFF" letter-spacing="1">{n}</text>
</svg>'''
    escribir(f"patrocinador-{i}.svg", svg)

print("Listo:", len(os.listdir(DIR)), "archivos en img/")
