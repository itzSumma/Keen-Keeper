import { useMemo, useState } from "react";
import { useFriendContext } from "../context/FriendContext.jsx";
import callIcon from "../../assets/call.png";
import textIcon from "../../assets/text.png";
import videoIcon from "../../assets/video.png";

const EVENT_ICONS = {
  call: callIcon,
  text: textIcon,
  video: videoIcon,
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
  const { timeline, friends } = useFriendContext();

  const filteredEvents = useMemo(() => {
    if (filter === "all") {
      return timeline;
    }

    return timeline.filter((event) => event.type === filter);
  }, [filter, timeline]);

  const selectedFriendNames = useMemo(
    () =>
      friends
        .filter((item) => timeline.some((event) => event.friendId === item.id))
        .map((item) => item.name),
    [friends, timeline],
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
          No data yet. Press Call, Text, or Video on any friend card first.
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
            {timeline.length === 0
              ? "No timeline data yet. Log Call, Text, or Video from a friend card first."
              : "No Call/Text/Video entries found for the current filter."}
          </p>
        ) : null}
        {filteredEvents.map((event) => (
          <article
            key={event.id}
            className="flex items-start gap-3 rounded-md border border-slate-200 bg-white px-3 py-3"
          >
            <div className="mt-0.5 rounded-full bg-slate-100 p-1.5 text-slate-600">
              <img src={EVENT_ICONS[event.type]} alt="" className="h-4 w-4 object-contain" />
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
