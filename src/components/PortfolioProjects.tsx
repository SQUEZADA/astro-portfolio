import { Surface, Text, Button } from "@cloudflare/kumo";

const projects = [
  {
    title: "Proyecto Alpha",
    description: "Sistema de diseño y componentes para productos Cloudflare.",
    tags: ["React", "Design Systems", "Kumo UI"],
    href: "#",
  },
  {
    title: "Proyecto Beta",
    description: "Dashboard de métricas en tiempo real con Astro y APIs.",
    tags: ["Astro", "APIs", "Visualización"],
    href: "#",
  },
  {
    title: "Proyecto Gamma",
    description: "Sitio editorial con tipografía distintiva y modo oscuro.",
    tags: ["CSS", "Tipografía", "Accesibilidad"],
    href: "#",
  },
];

export default function PortfolioProjects() {
  return (
    <section id="proyectos" className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-ink)] mb-4">
          Proyectos
        </h2>
        <p className="text-[var(--color-ink)]/70 text-lg max-w-2xl mb-14">
          Selección de trabajos recientes: diseño de interfaces, sistemas de
          componentes y experiencias web.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Surface
              key={p.title}
              as="article"
              className="p-6 rounded-xl border border-kumo-line bg-kumo-base hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="font-display text-xl font-semibold text-[var(--color-ink)] mb-2">
                {p.title}
              </h3>
              <Text variant="secondary" className="mb-4">
                {p.description}
              </Text>
              <div className="flex flex-wrap gap-2 mb-5">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-kumo-fill text-kumo-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a href={p.href}>
                <Button variant="ghost" size="sm">Ver proyecto →</Button>
              </a>
            </Surface>
          ))}
        </div>
      </div>
    </section>
  );
}
