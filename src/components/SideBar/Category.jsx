import { useSelector } from "react-redux";
import stringToColor from "../../Utilities/stringToHSL";

const Category = () => {
  const tasks = useSelector((state) => state.tasks);

  // Get unique categories
  const categories = [
    ...new Set(tasks.map((task) => task.category.toLowerCase())),
  ];

  const getUniqueTags = (category) => {
    const allTags = tasks
      .filter((task) => task.category.toLowerCase() === category)
      .reduce((tags, task) => {
        if (task.tags && Array.isArray(task.tags)) {
          return tags.concat(task.tags);
        }
        return tags;
      }, []);
    return [...new Set(allTags)];
  };
  return (
    <div className="flex flex-col gap-4">
      {categories.map((cat) => (
        <div key={cat} className="flex flex-col gap-2">
          <h3 className="text-lg font-medium">
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </h3>
          <ul className="space-y-2">
            {getUniqueTags(cat).map((tag) => (
              <li key={tag} className="w-fit rounded-full px-3 py-1 text-sm">
                <span
                  className="text-l font-bold"
                  style={{
                    color: stringToColor(tag),
                  }}
                >
                  #{tag}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Category;
