import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router";
import Icon from "../components/Icon.jsx";
import { useFriendContext } from "../context/FriendContext.jsx";
import { useToastContext } from "../context/ToastContext.jsx";

const STATUS_META = {
  overdue: "bg-rose-100 text-rose-600",
  "almost due": "bg-amber-100 text-amber-700",
  "on-track": "bg-emerald-100 text-emerald-700",
};

const QUICK_ACTIONS = [
  {
    type: "call",
    label: "Call",
    icon: "M2.25 4.5A2.25 2.25 0 0 1 4.5 2.25h2.31a1.5 1.5 0 0 1 1.46 1.14l.64 2.56a1.5 1.5 0 0 1-.58 1.59l-1.39 1a11.35 11.35 0 0 0 5.52 5.52l1-1.39a1.5 1.5 0 0 1 1.59-.58l2.56.64a1.5 1.5 0 0 1 1.14 1.46v2.31A2.25 2.25 0 0 1 19.5 21.75h-.75C9.97 21.75 2.25 14.03 2.25 5.25V4.5Z",
  },
  { type: "text", label: "Text", icon: "M3.75 5.25h16.5v11.25H9l-5.25 3v-14.25Z" },
  { type: "video", label: "Video", icon: "M3.75 7.5h10.5v9H3.75v-9Zm10.5 3.75 6-3.75v9l-6-3.75" },
];

function formatDueDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) {
    return value;
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getAvatarSource(url) {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("unsplash.com")) {
      return url;
    }
    parsed.searchParams.set("fit", "crop");
    parsed.searchParams.set("crop", "faces");
    parsed.searchParams.set("w", "180");
    parsed.searchParams.set("h", "180");
    parsed.searchParams.set("q", "90");
    parsed.searchParams.set("dpr", "2");
    return parsed.toString();
  } catch {
    return url;
  }
}

function StatCard({ value, label }) {
  return (
    <article className="rounded-md border border-slate-200 bg-white px-4 py-5 text-center shadow-sm">
      <p className="text-4xl font-semibold tracking-tight text-[#285846]">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{label}</p>
    </article>
  );
}

function UtilityButton({ label, icon, danger = false }) {
  return (
    <button
      type="button"
      className={[
        "inline-flex w-full items-center justify-center gap-2 rounded border border-slate-200 px-3 py-2 text-sm font-medium transition",
        danger ? "text-rose-500 hover:bg-rose-50" : "text-slate-700 hover:bg-slate-50",
      ].join(" ")}
    >
      <Icon path={icon} className="size-4" />
      {label}
    </button>
  );
}

export default function FriendDetailsPage() {
  const params = useParams();
  const { friends, addInteraction, addSelectedFriendId } = useFriendContext();
  const { showToast } = useToastContext();

  const friend = useMemo(
    () => friends.find((item) => item.id === Number(params.friendId)),
    [friends, params.friendId],
  );

  useEffect(() => {
    const id = Number(params.friendId);
    if (!Number.isNaN(id)) {
      addSelectedFriendId(id);
    }
  }, [params.friendId, addSelectedFriendId]);

  if (!friend) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-800">Friend not found</h1>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-md bg-[#285846] px-5 py-3 text-sm font-semibold text-white"
        >
          Back to Home
        </Link>
      </section>
    );
  }

  function handleQuickCheckIn(type) {
    const entry = addInteraction(friend, type);
    showToast(`${entry.title} logged`);
  }

  return (
    <section className="grid gap-4 lg:grid-cols-[260px_1fr]">
      <div className="space-y-3">
        <article className="rounded-md border border-slate-200 bg-white px-6 py-6 text-center shadow-sm">
          <img
            src={getAvatarSource(friend.picture)}
            alt={friend.name}
            className="mx-auto h-20 w-20 rounded-full object-cover"
          />
          <h1 className="mt-4 text-2xl font-semibold text-slate-800">{friend.name}</h1>
          <p
            className={`mx-auto mt-2 w-fit rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
              STATUS_META[friend.status]
            }`}
          >
            {friend.status}
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
            {friend.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-lime-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-lime-700"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm italic text-slate-500">"{friend.bio}"</p>
          <p className="mt-2 text-xs text-slate-400">{friend.email}</p>
        </article>

        <UtilityButton
          label="Snooze 2 Weeks"
          icon="M9 7.5V12l3 2.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
        <UtilityButton
          label="Archive"
          icon="M3.75 7.5h16.5M5.25 7.5l.75 11.25h12l.75-11.25M9 11.25h6"
        />
        <UtilityButton
          label="Delete"
          danger
          icon="M9.75 9.75v6M14.25 9.75v6M4.5 6.75h15M10.5 4.5h3"
        />
      </div>

      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <StatCard value={friend.days_since_contact} label="Days Since Contact" />
          <StatCard value={friend.goal} label="Goal (Days)" />
          <StatCard value={formatDueDate(friend.next_due_date)} label="Next Due" />
        </div>

        <article className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-700">Relationship Goal</h2>
              <p className="mt-2 text-sm text-slate-500">
                Connect every <span className="font-semibold text-slate-700">{friend.goal} days</span>
              </p>
            </div>
            <button
              type="button"
              className="rounded border border-slate-200 px-3 py-1 text-xs text-slate-500 hover:bg-slate-50"
            >
              Edit
            </button>
          </div>
        </article>

        <article className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-700">Quick Check-In</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.type}
                type="button"
                onClick={() => handleQuickCheckIn(action.type)}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
              >
                <Icon path={action.icon} className="size-4" />
                {action.label}
              </button>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
