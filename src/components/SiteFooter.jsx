import Icon from "./Icon.jsx";

const socialIcons = [
  {
    name: "YouTube",
    path: "M21.582 7.196a2.5 2.5 0 0 0-1.758-1.768C18.249 5 12 5 12 5s-6.249 0-7.824.428A2.5 2.5 0 0 0 2.418 7.196 26.296 26.296 0 0 0 2 12a26.31 26.31 0 0 0 .418 4.804 2.5 2.5 0 0 0 1.758 1.768C5.751 19 12 19 12 19s6.249 0 7.824-.428a2.5 2.5 0 0 0 1.758-1.768A26.31 26.31 0 0 0 22 12a26.296 26.296 0 0 0-.418-4.804ZM10 15.5v-7l6 3.5-6 3.5Z",
  },
  {
    name: "Facebook",
    path: "M15 8.25h2.25V4.5H15c-2.485 0-4.5 2.015-4.5 4.5v2.25H8.25V15h2.25v4.5H14.25V15h2.56l.44-3.75h-3V9c0-.414.336-.75.75-.75Z",
  },
  {
    name: "X",
    path: "M5 5 19 19M19 5 5 19",
  },
];

export default function SiteFooter() {
  return (
    <footer className="mt-16 bg-[#285846] text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-14 text-center sm:px-6 lg:px-8">
        <h2 className="text-5xl font-semibold tracking-tight sm:text-6xl">
          KeenKeeper
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-white/70">
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture the relationships that matter most.
        </p>

        <div className="mt-7">
          <p className="text-sm font-medium text-white/85">Social Links</p>
          <div className="mt-4 flex justify-center gap-3">
            {socialIcons.map((item) => (
              <a
                key={item.name}
                href="/"
                aria-label={item.name}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#285846]"
              >
                <Icon path={item.path} className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex w-full flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/55 md:flex-row">
          <p>&copy; 2026 KeenKeeper. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="/">Privacy Policy</a>
            <a href="/">Terms of Service</a>
            <a href="/">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
