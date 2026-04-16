import { Link } from "react-router";

export default function ErrorPage() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center shadow-md">
      <h1 className="text-3xl font-semibold text-slate-900">Page Not Found</h1>
      <p className="mx-auto mt-4 max-w-xl text-lg leading-6 text-slate-500">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-md bg-[#285846] px-5 py-3 text-md font-semibold text-white"
      >
        Back to Home
      </Link>
    </section>
  );
}
