const STATUS_META = {
  work: "bg-emerald-100 text-emerald-700",
  family: "bg-lime-100 text-lime-700",
  friend: "bg-amber-100 text-amber-700",
  travel: "bg-green-100 text-green-700",
  overdue: "bg-rose-100 text-rose-600",
  "on-track": "bg-emerald-100 text-emerald-700",
  "almost due": "bg-amber-100 text-amber-700",
};

function Tag({ children }) {
  return (
    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
      {children}
    </span>
  );
}

function StatusPill({ status }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        STATUS_META[status] ?? "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

export default function FriendCard({ friend }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white px-5 py-6 text-center shadow-sm">
      <img
        src={friend.picture}
        alt={friend.name}
        className="mx-auto h-16 w-16 rounded-full object-cover"
      />
      <h3 className="mt-4 text-base font-semibold text-slate-800">
        {friend.name}
      </h3>
      <p className="mt-1 text-xs text-slate-400">{friend.days_since_contact}d ago</p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        <Tag>{friend.tag}</Tag>
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
        <StatusPill status={friend.status} />
      </div>
    </article>
  );
}
