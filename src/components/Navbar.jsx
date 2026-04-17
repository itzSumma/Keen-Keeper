import { Link, NavLink } from "react-router";
import { AiOutlineHome } from "react-icons/ai";
import { RiTimeLine } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";

const navItems = [
  {
    to: "/",
    label: "Home",
    end: true,
    icon: AiOutlineHome,
  },
  {
    to: "/timeline",
    label: "Timeline",
    icon: RiTimeLine,
  },
  {
    to: "/stats",
    label: "Stats",
    icon: IoStatsChart,
  },
];

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2">
          <span className="text-2xl font-semibold tracking-tight text-slate-800 sm:text-3xl">
            Keen<span className="text-[#285846]">Keeper</span>
          </span>
        </Link>

        <nav className="flex w-full flex-wrap items-center justify-center gap-2 text-sm sm:text-base md:w-auto md:justify-end">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                [
                  "inline-flex min-w-[7rem] items-center justify-center gap-1.5 rounded-md border px-3 py-2 font-medium transition sm:min-w-0",
                  isActive
                    ? "border-[#285846] bg-[#285846] text-white shadow-sm"
                    : "border-transparent text-slate-500 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-700",
                ].join(" ")
              }
            >
              <item.icon className="size-3.5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
