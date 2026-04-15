import { Link, NavLink } from "react-router";
import Icon from "./Icon.jsx";

const navItems = [
  {
    to: "/",
    label: "Home",
    end: true,
    icon: "M3 10.5 12 3l9 7.5M5.25 9.75V21h13.5V9.75",
  },
  {
    to: "/timeline",
    label: "Timeline",
    icon: "M7.5 4.5v15M16.5 4.5v15M4.5 8.25h15M4.5 15.75h15",
  },
  {
    to: "/stats",
    label: "Stats",
    icon: "M6.75 16.5v-6M12 16.5v-9M17.25 16.5v-3",
  },
];

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-lg font-semibold text-slate-800">
          KeenKeeper
        </Link>

        <nav className="flex items-center gap-2 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                [
                  "inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 transition",
                  isActive
                    ? "border-[#285846] bg-[#285846] text-white"
                    : "border-transparent text-slate-500 hover:border-slate-200 hover:bg-slate-50",
                ].join(" ")
              }
            >
              <Icon path={item.icon} className="size-3.5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
