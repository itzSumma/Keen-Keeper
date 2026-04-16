import { useMemo, useState } from "react";
import Icon from "../components/Icon.jsx";
import { useFriendContext } from "../context/FriendContext.jsx";

const EVENT_ICONS = {
  call: "M2.25 4.5A2.25 2.25 0 0 1 4.5 2.25h2.31a1.5 1.5 0 0 1 1.46 1.14l.64 2.56a1.5 1.5 0 0 1-.58 1.59l-1.39 1a11.35 11.35 0 0 0 5.52 5.52l1-1.39a1.5 1.5 0 0 1 1.59-.58l2.56.64a1.5 1.5 0 0 1 1.14 1.46v2.31A2.25 2.25 0 0 1 19.5 21.75h-.75C9.97 21.75 2.25 14.03 2.25 5.25V4.5Z",
  text: "M3.75 5.25h16.5v11.25H9l-5.25 3v-14.25Z",
  video: "M3.75 7.5h10.5v9H3.75v-9Zm10.5 3.75 6-3.75v9l-6-3.75",
};

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) {
    return value;
  }
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
    timeZoneName: "short",
  });
}

export default function TimelinePage() {
  const [filter, setFilter] = useState("all");
  const { timeline, friends, selectedFriendIds } = useFriendContext();

  const filteredEvents = useMemo(() => {
    if (selectedFriendIds.length === 0) {
      return [];
    }

    const selectedOnly = timeline.filter((event) => selectedFriendIds.includes(event.friendId));

    if (filter === "all") {
      return selectedOnly;
    }

    return selectedOnly.filter((event) => event.type === filter);
  }, [filter, timeline, selectedFriendIds]);

  const selectedFriendNames = useMemo(
    () =>
      friends
        .filter((item) => selectedFriendIds.includes(item.id))
        .map((item) => item.name),
    [friends, selectedFriendIds],
  );

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <h1 className="text-5xl font-semibold tracking-tight text-slate-800">Timeline</h1>
      {selectedFriendNames.length > 0 ? (
        <p className="mt-2 text-sm text-slate-500">
          Showing interactions for{" "}
          <span className="font-semibold">{selectedFriendNames.join(", ")}</span>
        </p>
      ) : (
        <p className="mt-2 text-sm text-slate-500">
          No data yet. Select one or more friend cards first, then log Call, Text, or Video entries.
        </p>
      )}

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
          <option value="all">All interactions</option>
          <option value="call">Call</option>
          <option value="text">Text</option>
          <option value="video">Video</option>
        </select>
      </div>

      <div className="mt-4 space-y-2.5">
        {filteredEvents.length === 0 ? (
          <p className="rounded-md border border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
            {selectedFriendIds.length === 0
              ? "No timeline data to show yet for the current view."
              : "No Call/Text/Video entries found for the current selection."}
          </p>
        ) : null}
        {filteredEvents.map((event) => (
          <article
            key={event.id}
            className="flex items-start gap-3 rounded-md border border-slate-200 bg-white px-3 py-3"
          >
            <div className="mt-0.5 rounded-full bg-slate-100 p-1.5 text-slate-600">
              <Icon path={EVENT_ICONS[event.type]} className="size-3.5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700">{event.title}</p>
              <p className="mt-0.5 text-xs text-slate-400">{formatDate(event.date)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
