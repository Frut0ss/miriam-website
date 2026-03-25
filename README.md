# Miriam · Psicóloga — Web

Landing page moderna, mobile-friendly, lista para Vercel.

## 🚀 Deploy en Vercel (3 pasos)

### Opción A — Sin código (recomendada)
1. Sube esta carpeta a un repositorio en GitHub
2. Ve a [vercel.com](https://vercel.com) → New Project → importa el repo
3. Vercel detecta automáticamente React → clic en **Deploy**

### Opción B — CLI
```bash
npm install -g vercel
cd miriam-web
npm install
vercel
```

## 🛠 Desarrollo local
```bash
npm install
npm start
# Abre http://localhost:3000
```

## ✏️ Personalizar contenido

Abre `src/App.js` y edita:

| Qué cambiar | Dónde |
|---|---|
| Email de contacto | Busca `miriam@ejemplo.com` (hay 4 apariciones) |
| Foto | En `QuienSoy()` → reemplaza el placeholder por `<img src="..." alt="Miriam" />` |
| Vídeo | En `QuienSoy()` → añade `<iframe>` de YouTube/Vimeo |
| Redes sociales | En `Contacto()` → cambia los `href="#"` por tus URLs |
| Textos | Edita directamente el JSX de cada sección |

## 📁 Estructura
```
src/
  App.js    ← Todo el contenido y componentes
  App.css   ← Todo el estilo
public/
  index.html
vercel.json
```
