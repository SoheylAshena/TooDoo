import { useState } from "react";

function ToDo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form
      className="mx-auto w-full rounded-lg bg-blue-50"
      onSubmit={handleSubmit}
    >
      <div className="">
        <input
          id={props.id}
          className="mx-auto w-full rounded-md p-2"
          type="text"
          placeholder={props.name}
          value={newName}
          onChange={handleChange}
        />
      </div>
      <div className="flex">
        <button
          type="button"
          className="m-1 w-full rounded-md bg-blue-500 p-2 text-white"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="hidden">renaming {props.name}</span>
        </button>
        <button
          type="submit"
          className="m-1 w-full rounded-md bg-blue-500 p-2 text-white"
        >
          Save
          <span className="hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="m-3 mx-auto w-full overflow-hidden rounded-lg bg-blue-50">
      <div className="flex items-center">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          className="peer m-1 h-7 w-7 cursor-pointer appearance-none rounded-full border border-slate-300 shadow transition-all checked:border-blue-600 checked:bg-blue-600 hover:shadow-md"
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label
          className={`m-2 ${props.completed ? "line-through" : ""}`}
          htmlFor={props.id}
        >
          {props.name}
        </label>
      </div>
      <div className="flex">
        <button
          type="button"
          className="m-1 w-full rounded-md bg-blue-300 p-2"
          onClick={() => setEditing(true)}
        >
          Edit <span className="hidden">{props.name}</span>
        </button>

        <button
          type="button"
          className="m-1 w-full rounded-md bg-red-300 p-2"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete <span className="hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  return <li className="">{isEditing ? editingTemplate : viewTemplate}</li>;
}
export default ToDo;
