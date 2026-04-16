const socialIcons = [
  {
    name: "Facebook",
    src: "/assets/facebook.png",
  },
  {
    name: "Instagram",
    src: "/assets/instagram.png",
  },
  {
    name: "Twitter",
    src: "/assets/twitter.png",
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#285846] text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-14 text-center sm:px-6 lg:px-8">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
         KeenKeeper
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-white/70">
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture the relationships that matter most.
        </p>

        <div className="mt-7">
          <p className="text-lg font-medium text-white/85">Social Links</p>
          <div className="mt-4 flex justify-center gap-3">
            {socialIcons.map((item) => (
              <a
                key={item.name}
                href="/"
                aria-label={item.name}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white"
              >
                <img src={item.src} alt={item.name} className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 text-md flex w-full flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-white/55 md:flex-row">
          <p>&copy; 2026 KeenKeeper. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6 x">
            <a href="/">Privacy Policy</a>
            <a href="/">Terms of Service</a>
            <a href="/">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

