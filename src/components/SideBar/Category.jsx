import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { IoMdAdd } from "react-icons/io";
import stringToColor from "../../Utilities/stringToHSL";
import { useModal } from "../../context/ModalContext";
import { setFilters } from "../../context/Slices/filtersSlice";

const Category = ({ onClose }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  const { openAddTaskModal } = useModal();

  // Get unique categories
  const categories = [...new Set(tasks.map((task) => task.category))];

  const getUniqueTags = (category) => {
    const allTags = tasks
      .filter((task) => task.category === category)
      .reduce((tags, task) => {
        if (task.tags && Array.isArray(task.tags)) {
          return tags.concat(task.tags);
        }
        return tags;
      }, []);
    return [...new Set(allTags)];
  };

  const handleAddTask = () => {
    openAddTaskModal();
    if (onClose) onClose();
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-800">
          Categories
        </h2>
        <button
          onClick={handleAddTask}
          className="flex items-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 p-2.5 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-200"
          aria-label="Add new task"
        >
          <IoMdAdd className="text-xl" />
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <div
              key={cat}
              className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <h3
                onClick={() => {
                  dispatch(
                    setFilters({
                      category: cat,
                      status: "all",
                      search: "",
                      priority: "all",
                      sort: "date-desc",
                      time: "all",
                      tags: [],
                      partners: [],
                    }),
                  );
                  onClose();
                }}
                className="flex items-center text-lg font-semibold text-gray-800"
              >
                <span
                  className="mr-2 h-2 w-2 rounded-full"
                  style={{ backgroundColor: stringToColor(cat) }}
                ></span>
                {cat}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {getUniqueTags(cat).map((tag) => (
                  <li
                    key={tag}
                    style={{
                      backgroundColor: stringToColor(tag),
                    }}
                    className="rounded-full bg-gray-50 px-3.5 py-1.5 backdrop-blur-sm transition-colors duration-200 hover:bg-gray-100"
                    onClick={() => {
                      dispatch(
                        setFilters({
                          category: cat,
                          status: "all",
                          search: "",
                          priority: "all",
                          sort: "date-desc",
                          time: "all",
                          tags: [tag],
                          partners: [],
                        }),
                      );
                      onClose();
                    }}
                  >
                    <span className="text-sm font-bold text-white">#{tag}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50 p-8">
            <p className="mb-2 text-gray-500">No categories yet</p>
            <p className="text-sm text-gray-400">
              Add tasks with categories to see them here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

Category.propTypes = {


  
  onClose: PropTypes.func,
};




Category.defaultProps = {
  onClose: () => {},
};
export default Category;
