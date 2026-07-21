export default function Toast({ open, message }) {
  return (
    <div
      className={`absolute left-10 bottom-20 p-2 rounded-sm bg-green-500 text-white transition-all ease z-50 ${open ? "opacity-100 z-10 scale-100" : "opacity-0 scale-85 "}`}
    >
      <h2>{message}</h2>
    </div>
  );
}
