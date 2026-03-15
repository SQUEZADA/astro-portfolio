import { Surface, Text, Button, Input } from "@cloudflare/kumo";

export default function PortfolioContact() {
  return (
    <section id="contacto" className="py-24 px-6 md:px-12 lg:px-24 bg-kumo-recessed">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-ink)] mb-4">
          Contacto
        </h2>
        <p className="text-[var(--color-ink)]/70 text-lg mb-10">
          ¿Tienes un proyecto en mente? Escríbeme y hablamos.
        </p>

        <Surface className="p-8 rounded-2xl bg-kumo-base border border-kumo-line text-left">
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-kumo-default mb-1.5">
                Nombre
              </label>
              <Input id="name" placeholder="Tu nombre" className="w-full" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-kumo-default mb-1.5">
                Email
              </label>
              <Input id="email" type="email" placeholder="tu@email.com" className="w-full" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-kumo-default mb-1.5">
                Mensaje
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Cuéntame sobre tu proyecto..."
                className="w-full rounded-md border border-kumo-line bg-kumo-control px-3 py-2 text-kumo-default placeholder:text-kumo-subtle focus:outline-none focus:ring-2 focus:ring-kumo-brand"
              />
            </div>
            <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
              Enviar mensaje
            </Button>
          </form>
        </Surface>

        <p className="mt-8 text-kumo-subtle text-sm">
          O escríbeme a{" "}
          <a href="mailto:hola@ejemplo.com" className="text-kumo-brand hover:underline">
            hola@ejemplo.com
          </a>
        </p>
      </div>
    </section>
  );
}
