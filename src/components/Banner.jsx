import Icon from "./Icon.jsx";

export default function Banner() {
  return (
    <section className="px-2 pt-6 text-center">
      <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-slate-800 sm:text-5xl">
        Friends to keep close in your life
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400">
        Your personal shelf of meaningful connections. Browse, tend, and
        nurture the relationships that matter most.
      </p>
      <button
        type="button"
        className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#285846] px-5 py-3 text-sm font-semibold text-white"
      >
        <Icon path="M12 5.25v13.5M18.75 12H5.25" className="size-4" />
        Add a Friend
      </button>
    </section>
  );
}
