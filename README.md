# Portfolio — Astro + Kumo UI

Portafolio single-page con **Astro**, **@cloudflare/kumo** (Kumo UI) y **Tailwind CSS v4**. Diseño con tipografía distintiva (Syne + DM Sans) y estética refinada.

## Requisitos

- Node.js 18+
- npm, pnpm o yarn

## Instalación

```bash
npm install
```

## Scripts

| Comando   | Acción                |
|----------|------------------------|
| `npm run dev`    | Servidor de desarrollo |
| `npm run build`  | Build de producción    |
| `npm run preview`| Vista previa del build |

## Estructura

- `src/pages/index.astro` — Página principal (single page)
- `src/components/` — Componentes React que usan Kumo UI (Hero, Proyectos, Contacto)
- `src/layouts/BaseLayout.astro` — Layout base
- `src/styles/global.css` — Estilos globales + Kumo + Tailwind

## Personalización

1. **Nombre y descripción**: En `src/components/PortfolioHero.tsx` sustituye `[Tu nombre]` y el párrafo de presentación.
2. **Proyectos**: Edita el array `projects` en `src/components/PortfolioProjects.tsx`.
3. **Contacto**: Ajusta el email y el formulario en `src/components/PortfolioContact.tsx`.
4. **SEO**: En `src/pages/index.astro` se usa `BaseLayout` con `title` y `description`; puedes pasarlos como props.

## Kumo UI

Componentes usados: `Button`, `Surface`, `Text`, `Input`. Los estilos de Kumo se cargan en `global.css` antes de Tailwind para que los tokens de tema estén disponibles. Modo claro/oscuro se controla con `data-mode="light"` o `data-mode="dark"` en `<html>`.
