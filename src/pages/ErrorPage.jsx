import { isRouteErrorResponse, Link, useRouteError } from "react-router";

function getErrorMeta(error) {
  if (isRouteErrorResponse(error)) {
    const isMissing = error.status === 404;

    return {
      code: error.status,
      title: isMissing ? "Page Not Found" : error.statusText || "Something went wrong",
      message: isMissing
        ? "The page you are looking for does not exist or may have been moved."
        : error.data?.message || "There was a problem loading this page.",
    };
  }

  if (error instanceof Error) {
    return {
      code: 500,
      title: "Unexpected Error",
      message: error.message || "Something went wrong while rendering this page.",
    };
  }

  return {
    code: 404,
    title: "Page Not Found",
    message: "The page you are looking for does not exist.",
  };
}

export default function ErrorPage() {
  const error = useRouteError();
  const { code, title, message } = getErrorMeta(error);

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#285846]">{code}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-7 text-slate-500">{message}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex rounded-md bg-[#285846] px-5 py-3 text-md font-semibold text-white transition hover:bg-[#224b3b]"
          >
            Back to Home
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex rounded-md border border-slate-200 px-5 py-3 text-md font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Go Back
          </button>
        </div>
      </div>
    </section>
  );
}
