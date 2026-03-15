import { useState } from "react";
import { DatePicker, Surface, Text, Badge } from "@cloudflare/kumo";
import { CalendarDotsIcon } from "@phosphor-icons/react";

type EventCategory = "Conferencia" | "Workshop" | "Proyecto" | "Comunidad";

type PortfolioEvent = {
  date: Date;
  title: string;
  description: string;
  category: EventCategory;
  time: string;
};

const CATEGORY_BADGE: Record<EventCategory, "primary" | "success" | "outline" | "secondary"> = {
  Conferencia: "primary",
  Workshop: "success",
  Proyecto: "outline",
  Comunidad: "secondary",
};

const EVENTS: PortfolioEvent[] = [
  {
    date: new Date(2026, 2, 18),
    title: "Tech Talk: Web Performance",
    description: "Charla sobre Core Web Vitals y optimización de assets en producción.",
    category: "Conferencia",
    time: "18:00",
  },
  {
    date: new Date(2026, 2, 22),
    title: "Workshop: Design Systems",
    description: "Taller práctico para construir un sistema de componentes con Kumo UI.",
    category: "Workshop",
    time: "10:00",
  },
  {
    date: new Date(2026, 2, 25),
    title: "Lanzamiento Proyecto Beta",
    description: "Demo pública del nuevo dashboard de métricas con visualización en tiempo real.",
    category: "Proyecto",
    time: "09:00",
  },
  {
    date: new Date(2026, 2, 28),
    title: "Meetup Frontend Local",
    description: "Encuentro mensual de la comunidad frontend de la ciudad.",
    category: "Comunidad",
    time: "19:30",
  },
  {
    date: new Date(2026, 3, 5),
    title: "Code Review Session",
    description: "Revisión de código en equipo para el sprint de Q2.",
    category: "Proyecto",
    time: "15:00",
  },
];

const EVENT_DATES = EVENTS.map((e) => e.date);
const TODAY = new Date(2026, 2, 15);

function isSameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

function formatEventDate(date: Date) {
  return date.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export default function PortfolioEvents() {
  const [activeDate, setActiveDate] = useState<Date | null>(null);

  const visibleEvents = activeDate
    ? EVENTS.filter((e) => isSameDay(e.date, activeDate))
    : EVENTS.filter((e) => e.date >= TODAY);

  function handleCalendarChange(newDates: Date[]) {
    // Detect which event date was toggled by comparing to EVENT_DATES
    const removed = EVENT_DATES.find((e) => !newDates.some((d) => isSameDay(d, e)));
    const added = newDates.find((d) => !EVENT_DATES.some((e) => isSameDay(e, d)));
    const clicked = removed ?? added;

    if (clicked && EVENT_DATES.some((e) => isSameDay(e, clicked))) {
      setActiveDate((prev) => (prev && isSameDay(prev, clicked) ? null : clicked));
    }
    // Always keep event dates selected — calendar is display-only
  }

  return (
    <section id="eventos" className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-(--color-ink) mb-4">
          Eventos del mes
        </h2>
        <p className="text-ink/70 text-lg max-w-2xl mb-14">
          Conferencias, workshops y lanzamientos. Haz clic en una fecha marcada
          para ver el detalle.
        </p>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Calendar */}
          <Surface className="rounded-2xl border border-kumo-line bg-kumo-base p-4 shrink-0">
            <DatePicker
              mode="multiple"
              selected={EVENT_DATES}
              onChange={handleCalendarChange}
              defaultMonth={TODAY}
            />
            {/* Legend */}
            <div className="grid grid-cols-3 gap-x-3 gap-y-2 pt-4 px-1 border-t border-kumo-line mt-2">
              {(Object.keys(CATEGORY_BADGE) as EventCategory[]).map((cat) => (
                <span key={cat} className="flex items-center gap-1.5 text-xs text-kumo-subtle">
                  <Badge variant={CATEGORY_BADGE[cat]}>{cat}</Badge>
                </span>
              ))}
            </div>
          </Surface>

          {/* Event list */}
          <div className="flex-1 w-full">
            {activeDate && (
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-kumo-subtle capitalize">
                  {formatEventDate(activeDate)}
                </p>
                <button
                  onClick={() => setActiveDate(null)}
                  className="text-xs text-kumo-brand hover:underline cursor-pointer"
                >
                  Ver todos →
                </button>
              </div>
            )}

            {!activeDate && (
              <p className="text-sm text-kumo-subtle mb-6 flex items-center gap-2">
                <CalendarDotsIcon size={16} />
                Próximos eventos
              </p>
            )}

            {visibleEvents.length === 0 ? (
              <Surface className="p-8 rounded-xl border border-kumo-line bg-kumo-base text-center">
                <CalendarDotsIcon size={32} className="mx-auto text-kumo-subtle mb-3" />
                <Text variant="secondary">Sin eventos para esta fecha.</Text>
              </Surface>
            ) : (
              <div className="flex flex-col gap-4">
                {visibleEvents.map((event) => (
                  <Surface
                    key={event.title + event.date.toISOString()}
                    as="article"
                    className="p-5 rounded-xl border border-kumo-line bg-kumo-base flex gap-4 group hover:shadow-md transition-shadow duration-200"
                  >
                    {/* Date column */}
                    <div className="shrink-0 w-12 flex flex-col items-center justify-start pt-0.5">
                      <span className="font-display text-2xl font-bold text-(--color-accent) leading-none">
                        {event.date.getDate()}
                      </span>
                      <span className="text-xs text-kumo-subtle uppercase tracking-wide">
                        {event.date.toLocaleDateString("es-MX", { month: "short" })}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-kumo-line shrink-0" />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <Badge variant={CATEGORY_BADGE[event.category]}>
                          {event.category}
                        </Badge>
                        <span className="text-xs text-kumo-subtle">{event.time} hs</span>
                      </div>
                      <h3 className="font-display text-base font-semibold text-(--color-ink) mb-1 leading-snug">
                        {event.title}
                      </h3>
                      <Text variant="secondary" className="text-sm">
                        {event.description}
                      </Text>
                    </div>
                  </Surface>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
