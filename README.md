# Portfolio — Astro + Kumo UI

Portafolio **single-page** construido con Astro 5, React 19, Kumo UI (Cloudflare) y Tailwind CSS v4. Desplegado como sitio estático en Cloudflare Workers (modelo assets).

## Stack

| Tecnología | Versión | Rol |
|---|---|---|
| [Astro](https://astro.build) | ^5.0 | Framework principal, SSG estático |
| [React](https://react.dev) | ^19.0 | Islas interactivas (componentes Kumo) |
| [@cloudflare/kumo](https://kumo-ui.com) | 1.12.1 | Librería de componentes UI |
| [Tailwind CSS](https://tailwindcss.com) | ^4.0 | Estilos utilitarios |
| [@tailwindcss/vite](https://tailwindcss.com/docs/installation/vite) | ^4.0 | Plugin Vite para Tailwind v4 |
| [Wrangler](https://developers.cloudflare.com/workers/wrangler/) | ^4.73 | Deploy a Cloudflare Workers |
| [@phosphor-icons/react](https://phosphoricons.com) | ^2.1 | Iconografía |
| Syne + DM Sans | — | Tipografía (Google Fonts) |

---

## Requisitos previos

- **Node.js 20** (versión usada en producción por Cloudflare)
- **npm 10+** (incluido con Node 20)

Verifica tu versión antes de continuar:

```bash
node -v   # debe mostrar v20.x.x
npm -v    # debe mostrar 10.x.x
```

Si necesitas cambiar de versión de Node, usa [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) o [nvm-windows](https://github.com/coreybutler/nvm-windows):

```bash
nvm install 20
nvm use 20
```

---

## Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone <url-del-repo>
cd astro-portfolio
npm install
```

> `npm install` instala tanto las `dependencies` (Astro, React, Kumo UI…) como las `devDependencies` (Tailwind Vite plugin, tipos TypeScript, Wrangler).

---

## Desarrollo local

```bash
npm run dev
```

Astro inicia el servidor de desarrollo en `http://localhost:4321` con hot-reload. Los componentes React se hidratan en el cliente usando `client:visible`.

**Comandos disponibles:**

| Comando | Acción |
|---|---|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm start` | Alias de `npm run dev` |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Sirve el build local para revisión |

### Estructura del proyecto

```
src/
├── components/
│   ├── PortfolioHero.tsx      # Sección hero con nombre, bajada y CTAs
│   ├── PortfolioProjects.tsx  # Grid de proyectos con Surface y Badge
│   ├── PortfolioEvents.tsx    # Calendario de eventos con DatePicker de Kumo
│   └── PortfolioContact.tsx   # Formulario de contacto con Input de Kumo
├── layouts/
│   └── BaseLayout.astro       # Layout base (head, meta, fuentes)
├── pages/
│   └── index.astro            # Página única — orquesta todos los componentes
└── styles/
    └── global.css             # Estilos globales, tokens de tema, animaciones
public/
└── favicon.svg
astro.config.mjs               # Config Astro (React + Tailwind Vite plugin)
wrangler.jsonc                 # Config deploy Cloudflare Workers
tsconfig.json                  # TypeScript (extiende astro/tsconfigs/strict)
```

---

## Personalización

### Información personal

En `src/components/PortfolioHero.tsx`:
- Reemplaza `[Tu nombre]` con tu nombre real.
- Edita el párrafo de presentación.
- Cambia los textos de los botones CTA si lo necesitas.

### Proyectos

En `src/components/PortfolioProjects.tsx`, edita el array `projects`:

```ts
const projects = [
  {
    title: "Mi Proyecto",
    description: "Descripción del proyecto.",
    tags: ["React", "TypeScript"],
    href: "https://github.com/tu-usuario/mi-proyecto",
  },
  // ...
];
```

### Calendario de eventos

En `src/components/PortfolioEvents.tsx`, edita el array `EVENTS`:

```ts
const EVENTS: PortfolioEvent[] = [
  {
    date: new Date(2026, 3, 10),       // mes es 0-indexado (3 = abril)
    title: "Nombre del evento",
    description: "Descripción breve.",
    category: "Conferencia",           // "Conferencia" | "Workshop" | "Proyecto" | "Comunidad"
    time: "18:00",
  },
  // ...
];
```

Las fechas con eventos aparecen marcadas en el calendario. Al hacer clic en una fecha marcada, la lista se filtra para mostrar solo los eventos de ese día.

### Contacto

En `src/components/PortfolioContact.tsx`:
- Cambia el email en el enlace `href="mailto:..."` al final del componente.
- El formulario es estático (no envía datos por defecto). Para conectar un backend, agrega la lógica en el `onSubmit` del `<form>`.

### Colores y tipografía

En `src/styles/global.css`, dentro del bloque `@theme inline`, puedes ajustar las variables del tema:

```css
@theme inline {
  --font-display: "Syne", system-ui, sans-serif;
  --font-body: "DM Sans", system-ui, sans-serif;
  --color-ink: oklch(0.18 0.02 260);      /* color principal del texto */
  --color-paper: oklch(0.98 0.005 90);    /* fondo de la página */
  --color-accent: oklch(0.55 0.22 260);   /* color de acento (azul/violeta) */
}
```

### Modo oscuro

Kumo UI gestiona el modo oscuro vía el atributo `data-mode` en el `<html>`. Para activar el modo oscuro por defecto, edita `src/layouts/BaseLayout.astro`:

```html
<html lang="es" data-mode="dark">
```

---

## Build de producción

```bash
npm run build
```

Genera la carpeta `dist/` con HTML estático, CSS optimizado y chunks de JS divididos por componente. Para revisar el build antes de desplegar:

```bash
npm run preview
```

Esto sirve `dist/` en `http://localhost:4321`. El comportamiento debe ser idéntico al entorno de producción.

---

## Despliegue en Cloudflare

El proyecto usa el modelo de **Cloudflare Workers con Assets** (no Cloudflare Pages classic). El archivo `wrangler.jsonc` apunta la carpeta `dist/` como directorio de assets estáticos.

### Despliegue automático (recomendado)

Conecta el repositorio a Cloudflare Pages/Workers desde el dashboard:

1. Ve a [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create**.
2. Conecta tu repositorio de GitHub/GitLab.
3. Configura el build:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** `20`
4. Haz clic en **Deploy**. Cloudflare ejecutará el build y desplegará automáticamente en cada push a la rama principal.

> No configures un deploy command manual. Cloudflare maneja el deploy del output estático automáticamente.

### Despliegue manual con Wrangler

Para desplegar desde tu máquina local:

```bash
# Autentica Wrangler con tu cuenta Cloudflare (solo la primera vez)
npx wrangler login

# Build + deploy en un solo paso
npm run build && npx wrangler deploy
```

> `wrangler deploy` lee la configuración de `wrangler.jsonc` y sube el contenido de `dist/` como Worker con assets estáticos.

### Variables de entorno

Para agregar variables de entorno (por ejemplo, tokens de API para el formulario de contacto):

```bash
npx wrangler secret put MI_VARIABLE
```

En el dashboard de Cloudflare: **Workers & Pages** → tu worker → **Settings** → **Variables and Secrets**.

---

## Notas técnicas

- **Tailwind v4 + Kumo**: Los estilos de Kumo se importan antes de `@import "tailwindcss"` en `global.css` para que los tokens de tema de Kumo (`--color-kumo-*`) se registren primero. El plugin `@tailwindcss/vite` reemplaza a `@astrojs/tailwind` (que era para Tailwind v3).
- **`@astrojs/cloudflare` NO está instalado**: Este proyecto es completamente estático (`output: 'static'`). El adaptador de Cloudflare solo es necesario para SSR. No lo agregues o Cloudflare intentará convertir el proyecto a un Worker SSR.
- **Islas React**: Cada componente usa `client:visible`, lo que significa que el JS de React solo se carga cuando el componente entra en el viewport. Esto mantiene el Time to Interactive bajo.
- **Kumo UI versión fijada**: `@cloudflare/kumo` está en `1.12.1` exacto (sin `^`) para evitar breaking changes de actualizaciones menores.
