import { Button, Surface, Text } from "@cloudflare/kumo";

export default function PortfolioHero() {
  return (
    <header className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background: soft gradient + geometric accent */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden
      >
        <div
          className="absolute top-1/4 right-0 w-[60vw] max-w-[600px] h-[50vh] rounded-full opacity-[0.08] blur-3xl"
          style={{ background: "oklch(0.55 0.22 260)" }}
        />
        <div
          className="absolute bottom-1/4 left-0 w-[40vw] max-w-[400px] h-[40vh] rounded-full opacity-[0.06] blur-3xl"
          style={{ background: "oklch(0.55 0.22 260)" }}
        />
      </div>

      <div className="max-w-4xl">
        <p
          className="font-display text-sm uppercase tracking-[0.3em] text-[var(--color-accent-muted)] mb-4 animate-fade-in"
          style={{ animationDelay: "0.1s", animationFillMode: "both" }}
        >
          Desarrollador & Diseñador
        </p>
        <h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[var(--color-ink)] leading-[1.05] mb-6 animate-fade-in"
          style={{ animationDelay: "0.2s", animationFillMode: "both" }}
        >
          Hola, soy{" "}
          <span className="text-[var(--color-accent)]">[Tu nombre]</span>
        </h1>
        <p
          className="text-lg sm:text-xl text-[var(--color-ink)]/80 max-w-xl mb-10 animate-fade-in"
          style={{ animationDelay: "0.35s", animationFillMode: "both" }}
        >
          Creo experiencias digitales con foco en rendimiento, accesibilidad y
          diseño con personalidad.
        </p>
        <div
          className="flex flex-wrap gap-4 animate-fade-in"
          style={{ animationDelay: "0.5s", animationFillMode: "both" }}
        >
          <a href="#proyectos">
            <Button variant="primary" size="lg">Ver proyectos</Button>
          </a>
          <a href="#contacto">
            <Button variant="outline" size="lg">Contacto</Button>
          </a>
        </div>
      </div>
    </header>
  );
}
