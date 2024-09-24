import { useState } from "react";

function Form(props) {
  const [name, setName] = useState("");

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (name === "") {
      alert("Type something my dear!");
    } else {
      props.addTask(name);
    }
    setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-center font-semibold">
        <label htmlFor="new-todo-input" className="">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        placeholder="Type here..."
        id="new-todo-input"
        className="m-3 mx-auto block w-full rounded-md p-3"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="w-full rounded-md bg-blue-950 p-3 text-xl font-bold text-white"
      >
        Add
      </button>
    </form>
  );
}

export default Form;
