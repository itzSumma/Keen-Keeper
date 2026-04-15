import { useMemo, useState } from "react";
import Icon from "../components/Icon.jsx";

const EVENT_ICONS = {
  call: "M2.25 4.5A2.25 2.25 0 0 1 4.5 2.25h2.31a1.5 1.5 0 0 1 1.46 1.14l.64 2.56a1.5 1.5 0 0 1-.58 1.59l-1.39 1a11.35 11.35 0 0 0 5.52 5.52l1-1.39a1.5 1.5 0 0 1 1.59-.58l2.56.64a1.5 1.5 0 0 1 1.14 1.46v2.31A2.25 2.25 0 0 1 19.5 21.75h-.75C9.97 21.75 2.25 14.03 2.25 5.25V4.5Z",
  text: "M3.75 5.25h16.5v11.25H9l-5.25 3v-14.25Z",
  meetup: "M3.6 7.8h16.8M6 10.5l2.4 4.2 2.4-2.4 2.4 3.6 2.4-4.8 2.4 3",
  video: "M3.75 7.5h10.5v9H3.75v-9Zm10.5 3.75 6-3.75v9l-6-3.75",
};

const TIMELINE_EVENTS = [
  { id: 1, type: "meetup", person: "Tom Baker", date: "March 29, 2026" },
  { id: 2, type: "text", person: "Sarah Chen", date: "March 28, 2026" },
  { id: 3, type: "meetup", person: "Olivia Martinez", date: "March 26, 2026" },
  { id: 4, type: "video", person: "Aisha Patel", date: "March 23, 2026" },
  { id: 5, type: "meetup", person: "Sarah Chen", date: "March 21, 2026" },
  { id: 6, type: "call", person: "Marcus Johnson", date: "March 19, 2026" },
  { id: 7, type: "meetup", person: "Aisha Patel", date: "March 17, 2026" },
  { id: 8, type: "text", person: "Olivia Martinez", date: "March 13, 2026" },
  { id: 9, type: "call", person: "Lisa Nakamura", date: "March 11, 2026" },
  { id: 10, type: "call", person: "Sarah Chen", date: "March 11, 2026" },
  { id: 11, type: "video", person: "Marcus Johnson", date: "March 6, 2026" },
  { id: 12, type: "video", person: "Ryan O'Brien", date: "February 24, 2026" },
];

function formatType(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export default function TimelinePage() {
  const [filter, setFilter] = useState("all");

  const filteredEvents = useMemo(() => {
    if (filter === "all") {
      return TIMELINE_EVENTS;
    }

    return TIMELINE_EVENTS.filter((event) => event.type === filter);
  }, [filter]);

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <h1 className="text-5xl font-semibold tracking-tight text-slate-800">Timeline</h1>

      <div className="mt-5">
        <label htmlFor="timeline-filter" className="sr-only">
          Filter timeline
        </label>
        <select
          id="timeline-filter"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="h-10 min-w-52 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition focus:border-[#285846]"
        >
          <option value="all">Filter timeline</option>
          <option value="call">Calls</option>
          <option value="text">Texts</option>
          <option value="meetup">Meetups</option>
          <option value="video">Videos</option>
        </select>
      </div>

      <div className="mt-4 space-y-2.5">
        {filteredEvents.map((event) => (
          <article
            key={event.id}
            className="flex items-start gap-3 rounded-md border border-slate-200 bg-white px-3 py-3"
          >
            <div className="mt-0.5 rounded-full bg-slate-100 p-1.5 text-slate-600">
              <Icon path={EVENT_ICONS[event.type]} className="size-3.5" />
            </div>
            <div>
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-slate-700">{formatType(event.type)}</span>{" "}
                with {event.person}
              </p>
              <p className="mt-0.5 text-xs text-slate-400">{event.date}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
