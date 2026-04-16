function MetricCard({ value, label }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white px-6 py-7 text-center shadow-sm">
      <p className="text-4xl font-semibold text-[#285846]">{value}</p>
      <p className="mt-2 text-lg text-slate-500">{label}</p>
    </article>
  );
}

export default function SummaryCards({ metrics }) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard value={metrics.totalFriends} label="Total Friends" />
      <MetricCard value={metrics.onTrack} label="On Track" />
      <MetricCard value={metrics.needAttention} label="Need Attention" />
      <MetricCard
        value={metrics.interactionsThisMonth}
        label="Interactions This Month"
      />
    </section>
  );
}
