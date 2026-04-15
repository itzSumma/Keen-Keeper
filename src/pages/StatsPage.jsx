import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useFriendContext } from "../context/FriendContext.jsx";

const COLORS = {
  text: "#7c3aed",
  call: "#285846",
  video: "#22a35a",
};

export default function StatsPage() {
  const { interactionCounts } = useFriendContext();

  const data = [
    { name: "Text", value: interactionCounts.text, key: "text" },
    { name: "Call", value: interactionCounts.call, key: "call" },
    { name: "Video", value: interactionCounts.video, key: "video" },
  ];

  return (
    <section className="mx-auto w-full max-w-5xl">
      <h1 className="text-5xl font-semibold tracking-tight text-slate-800">Friendship Analytics</h1>

      <article className="mt-6 rounded-md border border-slate-200 bg-white px-6 py-5 shadow-sm">
        <h2 className="text-sm font-medium text-slate-600">By Interaction Type</h2>

        <div className="mt-6 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                dataKey="value"
                innerRadius={58}
                outerRadius={82}
                paddingAngle={3}
                stroke="#ffffff"
                strokeWidth={3}
              >
                {data.map((entry) => (
                  <Cell key={entry.key} fill={COLORS[entry.key]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-6">
          {data.map((item) => (
            <div key={item.key} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[item.key] }} />
              <span className="text-xs text-slate-500">
                {item.name}: {item.value}
              </span>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
