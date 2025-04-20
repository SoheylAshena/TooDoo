import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import stringToColor from "../../../Utilities/stringToHSL";
import { setFilters } from "../../../context/Slices/filtersSlice";

const Category = ({ onClose }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

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

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Categories
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <div
              key={cat}
              className="flex flex-col gap-2 rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
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
                className="cursor-pointer text-base font-medium text-gray-800 hover:text-blue-500 dark:text-gray-100 dark:hover:text-blue-400"
              >
                <span
                  className="mr-2 inline-block h-2 w-2 rounded-full"
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
                    className="rounded-full px-3 py-1 text-xs font-medium text-white transition-opacity hover:opacity-80 dark:text-gray-900"
                    onClick={() => {
                      dispatch(
                        setFilters({
                          category: "all",
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
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 p-6 text-center dark:border-gray-700 dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No categories yet. Add tasks with categories to see them here.
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

export default Category;
