import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import ToDo from "./components/ToDo";
import { useState } from "react";
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // Copy the task and update its name
        return { ...task, name: newName };
      }
      // Return the original task if it's not the edited task
      return task;
    });
    setTasks(editedTaskList);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <ToDo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length == 0 ? "You have no tasks to do" : `${taskList.length} ${tasksNoun} remaining`}`;

  return (
    <>
      <div className="fixed top-0 -z-50 h-full w-full bg-gradient-to-tr from-black to-blue-950"></div>
      <div className="m-10 mx-auto block max-w-xl rounded-lg bg-blue-100 p-5">
        <h1 className="p-5 text-center text-3xl font-bold">TooDoo</h1>
        <Form addTask={addTask} />
        <div className="my-3 flex justify-center">{filterList}</div>

        <h2 id="list-heading" className="mx-3 my-5 text-xl font-semibold">
          {headingText}
        </h2>
        <ul role="list" className="" aria-labelledby="list-heading">
          {taskList}
        </ul>
      </div>
    </>
  );
}

export default App;
