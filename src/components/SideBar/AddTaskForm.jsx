import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTasks } from "../../context/Slices/tasksSlice";

const AddTaskForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [task, setTask] = useState({
    text: "",
    category: "Personal",
    tags: [],
    partners: [],
    date: new Date(),
  });

  const updateTask = (field, value) => {
    setTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    updateTask(name, value);
  };

  const addItem = (type) => (e) => {
    if (e.key !== "Enter" || !e.target.value.trim()) return;
    e.preventDefault();
    const newValue = e.target.value.trim();
    if (task[type].includes(newValue)) return;
    if (task[type].length > 4) return;
    updateTask(type, [...task[type], newValue]);
    e.target.value = "";
  };

  const removeItem = (type, item) => {
    updateTask(
      type,
      task[type].filter((i) => i !== item),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.text.trim()) return;
    dispatch(
      addTasks({ ...task, text: task.text.trim(), date: new Date(task.date) }),
    );
    setTask({
      text: "",
      category: "Personal",
      tags: [],
      partners: [],
      date: new Date(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-3xl bg-white p-6"
      >
        <textarea
          name="text"
          required
          value={task.text}
          onChange={handleInput}
          placeholder="What needs to be done?"
          className="mb-6 w-full resize-none border-b-2 border-blue-300 p-2 text-xl font-semibold outline-none focus:border-blue-500"
        />

        <input
          name="category"
          type="text"
          value={task.category}
          onChange={handleInput}
          className="mb-6 w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-400"
        ></input>

        <input
          type="datetime-local"
          name="date"
          value={task.date}
          onChange={handleInput}
          className="mb-6 w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="tags"
          onKeyDown={addItem("tags")}
          placeholder="Add tag..."
          className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="mb-6 flex">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center px-2 py-1 text-sm text-blue-700"
            >
              #{tag}
              <button
                type="button"
                onClick={() => removeItem("tags", tag)}
                className="text-red-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <input
          name="partners"
          onKeyDown={addItem("partners")}
          placeholder="Add partner..."
          className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="mb-8 flex">
          {task.partners.map((partner) => (
            <span
              key={partner}
              className="flex items-center px-2 py-1 text-sm text-blue-700"
            >
              +{partner}
              <button
                type="button"
                onClick={() => removeItem("partners", partner)}
                className="text-red-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <p>Max Tags and Partners: 5</p>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-5 py-2 text-blue-700 hover:bg-blue-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-blue-700 px-5 py-2 text-white hover:bg-blue-800"
            >
              Create Task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
