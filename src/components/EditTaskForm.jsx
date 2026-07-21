export default function EditTaskForm({
  showEdit,
  modal,
  title,
  body,
  setTitle,
  setBody,
  editTodo,
}) {
  // Control Toast Function

  return (
    <div
      className={`absolute inset-0 w-full h-full bg-[#00000056] px-2 text-black transition-all ${modal ? "opacity-100 z-50 " : "opacity-0 -z-10"}`}
      onClick={(e) => {
        if (e.target.id == "overlay") showEdit(false);
      }}
      id="overlay"
    >
      <div
        className={`relative bg-white p-4 rounded-sm max-w-xl mx-auto mt-40 justify-stretch ${modal ? "scale-100 opacity-100" : "scale-90 opacity-70"} transition-all`}
        id="form"
      >
        <div className="w-full">
          <label htmlFor="title">العنوان</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            className="p-2 border-b w-full focus:outline-none mb-4"
          />
        </div>
        <div className="w-full">
          <label htmlFor="body">الوصف</label>
          <input
            type="text"
            id="body"
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
            }}
            className="p-2 border-b w-full focus:outline-none"
          />
        </div>
        <button
          onClick={() => {
            editTodo();
          }}
          className="bg-red-500 py-1 px-3 rounded-sm mt-4 text-white cursor-pointer mr-auto block"
        >
          تعديل
        </button>
      </div>
    </div>
  );
}
