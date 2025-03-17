import { useSelector, useDispatch } from "react-redux";
import { deleteTasks, toggleTask } from "../context/Slices/tasksSlice";

const MainBody = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8">
      <h2 className="mb-8 text-3xl font-bold tracking-tight text-indigo-800">
        Today&apos;s Tasks
      </h2>
      <div className="mx-auto max-w-4xl">
        {tasks.length === 0 ? (
          <p className="text-center italic text-gray-500">
            No tasks yet - enjoy your day! ✨
          </p>
        ) : (
          <ul className="space-y-6">
            {tasks.map((item) => (
              <li
                key={item.id}
                className="rounded-xl border-l-4 border-indigo-500 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-1 items-start space-x-4">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => dispatch(toggleTask(item.id))}
                      className="mt-1 h-5 w-5 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="flex-1">
                      <h3
                        className={`text-lg font-semibold ${
                          item.completed
                            ? "text-gray-400 line-through"
                            : "text-gray-800"
                        }`}
                      >
                        {item.text}
                      </h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-indigo-600">
                            Category:
                          </span>
                          <span className="text-sm text-gray-600">
                            {item.category}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center space-x-2">
                          <span className="text-sm font-medium text-indigo-600">
                            Tags:
                          </span>
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="mb-1 mr-2 inline-block rounded-full bg-indigo-100 px-2 py-1 text-xs text-indigo-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-indigo-600">
                            Partners:
                          </span>
                          <span className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-600">
                            {item.partners || "None"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-indigo-600">
                            Created:
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(item.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => dispatch(deleteTasks(item.id))}
                    className="ml-4 flex-shrink-0 rounded-lg bg-red-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MainBody;
