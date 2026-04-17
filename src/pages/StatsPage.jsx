import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useFriendContext } from "../context/FriendContext.jsx";

const COLORS = {
  text: "#7c3aed",
  call: "#285846",
  video: "#22a35a",
};

export default function StatsPage() {
  const { timeline, friends } = useFriendContext();

  const selectedFriendNames = useMemo(
    () =>
      friends
        .filter((item) => timeline.some((event) => event.friendId === item.id))
        .map((item) => item.name),
    [friends, timeline],
  );

  const interactionCounts = useMemo(
    () =>
      timeline.reduce(
        (acc, item) => {
          if (item.type in acc) {
            acc[item.type] += 1;
          }
          return acc;
        },
        { call: 0, text: 0, video: 0 },
      ),
    [timeline],
  );

  const data = [
    { name: "Text", value: interactionCounts.text, key: "text" },
    { name: "Call", value: interactionCounts.call, key: "call" },
    { name: "Video", value: interactionCounts.video, key: "video" },
  ];

  const hasData = data.some((item) => item.value > 0);

  return (
    <section className="mx-auto w-full max-w-5xl">
      <h1 className="text-5xl font-semibold tracking-tight text-slate-800">Friendship Analytics</h1>
      {selectedFriendNames.length > 0 ? (
        <p className="mt-2 text-md text-slate-600">
          Showing analytics for <span className="font-semibold">{selectedFriendNames.join(", ")}</span>
        </p>
      ) : (
        <p className="mt-2 text-md text-slate-600">
          No data yet. Press Call, Text, or Video on any friend card first.
        </p>
      )}

      <article className="mt-6 rounded-md border border-slate-300 bg-white px-6 py-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#285846]/20 hover:shadow-md active:-translate-y-0.5 active:border-[#285846]/20 active:shadow-sm">
        <h2 className="text-md font-medium text-slate-600">By Interaction Type</h2>

        <div className="mt-6 h-64 w-full">
          {hasData ? (
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
          ) : (
            <div className="flex h-full items-center justify-center rounded-md border border-dashed border-slate-200 bg-slate-50 px-4 text-center text-md text-slate-500">
              No interaction stats yet. Log Call, Text, or Video from a friend card first.
            </div>
          )}
        </div>

        {hasData ? (
          <div className="mt-2 flex flex-wrap items-center justify-center gap-6">
            {data.map((item) => (
              <div key={item.key} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[item.key] }} />
                <span className="text-md text-slate-600">
                  {item.name}: {item.value}
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </article>
    </section>
  );
}
