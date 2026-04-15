import { useToastContext } from "../context/ToastContext.jsx";

export default function ToastViewport() {
  const { toasts } = useToastContext();

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="rounded-md border border-emerald-200 bg-white px-4 py-3 text-sm font-medium text-emerald-700 shadow-lg"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
