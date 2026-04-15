import { useMemo } from "react";
import { useFriendContext } from "../context/FriendContext.jsx";
import Icon from "../components/Icon.jsx";

function getCrispAvatar(url) {
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
    <article className="rounded-md border border-slate-200 bg-white px-4 py-5 text-center">
      <p className="text-4xl font-semibold tracking-tight text-[#285846]">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{label}</p>
    </article>
  );
}

function ActionButton({ icon, label, danger = false }) {
  return (
    <button
      type="button"
      className={[
        "inline-flex w-full items-center justify-center gap-2 rounded border border-slate-200 px-3 py-2 text-xs font-medium transition",
        danger
          ? "text-rose-500 hover:border-rose-200 hover:bg-rose-50"
          : "text-slate-700 hover:bg-slate-50",
      ].join(" ")}
    >
      <Icon path={icon} className="size-3.5" />
      {label}
    </button>
  );
}

const ACTIONS = [
  {
    label: "Snooze 2 Weeks",
    icon: "M9 7.5V12l3 2.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  },
  {
    label: "Archive",
    icon: "M3.75 7.5h16.5M5.25 7.5l.75 11.25h12l.75-11.25M9 11.25h6",
  },
  {
    label: "Delete",
    danger: true,
    icon: "M9.75 9.75v6M14.25 9.75v6M4.5 6.75h15M10.5 4.5h3",
  },
];

const QUICK_ACTIONS = [
  { label: "Call", icon: "M2.25 4.5A2.25 2.25 0 0 1 4.5 2.25h2.31a1.5 1.5 0 0 1 1.46 1.14l.64 2.56a1.5 1.5 0 0 1-.58 1.59l-1.39 1a11.35 11.35 0 0 0 5.52 5.52l1-1.39a1.5 1.5 0 0 1 1.59-.58l2.56.64a1.5 1.5 0 0 1 1.14 1.46v2.31A2.25 2.25 0 0 1 19.5 21.75h-.75C9.97 21.75 2.25 14.03 2.25 5.25V4.5Z" },
  { label: "Text", icon: "M3.75 5.25h16.5v11.25H9l-5.25 3v-14.25Z" },
  { label: "Video", icon: "M3.75 7.5h10.5v9H3.75v-9Zm10.5 3.75 6-3.75v9l-6-3.75" },
];

export default function TimelinePage() {
  const { friends } = useFriendContext();
  const friend = useMemo(
    () => friends.find((item) => item.name === "Emma Wilson") ?? friends[0],
    [friends],
  );

  if (!friend) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
        <div className="space-y-3">
          <article className="rounded-md border border-slate-200 bg-white px-6 py-6 text-center shadow-sm">
            <img
              src={getCrispAvatar(friend.picture)}
              alt={friend.name}
              className="mx-auto h-20 w-20 rounded-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <h2 className="mt-4 text-xl font-semibold text-slate-800">{friend.name}</h2>
            <p className="mx-auto mt-2 w-fit rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-rose-600">
              Overdue
            </p>
            <p className="mx-auto mt-1 w-fit rounded-full bg-lime-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-lime-700">
              Family
            </p>
            <p className="mt-4 text-sm italic text-slate-500">
              "Former colleague, great mentor"
            </p>
            <p className="mt-0.5 text-[10px] text-slate-400">Preferred: email</p>
          </article>

          <div className="space-y-2">
            {ACTIONS.map((action) => (
              <ActionButton
                key={action.label}
                icon={action.icon}
                label={action.label}
                danger={action.danger}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard value="62" label="Days Since Contact" />
            <StatCard value="30" label="Goal (Days)" />
            <StatCard value="Feb 27, 2026" label="Next Due" />
          </div>

          <article className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-700">Relationship Goal</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Connect every <span className="font-semibold text-slate-700">30 days</span>
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
            <h3 className="text-sm font-semibold text-slate-700">Quick Check-In</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <Icon path={action.icon} className="size-4" />
                  {action.label}
                </button>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
