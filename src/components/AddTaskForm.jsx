import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { addTasks } from "../context/Slices/tasksSlice";
import { FaRegFlag } from "react-icons/fa";
import { MdClose, MdAdd } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { closeAddForm } from "../context/Slices/addFormSlice";

// Extracted suggestion list component
const SuggestionList = ({
  suggestions,
  activeSuggestion,
  onSelect,
  suggestionType,
}) => {
  if (!suggestions.length) return null;

  return (
    <ul className="ring-opacity-5 absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black focus:outline-none sm:text-sm dark:bg-gray-800">
      {suggestions.map((suggestion, index) => (
        <li
          key={suggestion}
          className={`relative cursor-pointer px-4 py-2 select-none ${
            index === activeSuggestion
              ? "bg-indigo-100 text-indigo-900 dark:bg-indigo-900 dark:text-indigo-100"
              : "text-gray-900 dark:text-gray-300"
          }`}
          onClick={() => onSelect(suggestion)}
        >
          <span className="flex items-center">
            {suggestionType === "tag" && "#"}
            {suggestionType === "person" && "+"}
            {suggestion}
          </span>
        </li>
      ))}
    </ul>
  );
};

SuggestionList.displayName = "SuggestionList";

SuggestionList.propTypes = {
  suggestions: PropTypes.array.isRequired,
  activeSuggestion: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  suggestionType: PropTypes.string.isRequired,
};

// Improved DatePicker component with separate date and time inputs
const DatePicker = ({ updateTask, task }) => {
  return (
    <div className="mt-1 rounded-md border border-gray-300 bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-1 flex items-center justify-between">
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
          Due Date
        </label>
      </div>

      <div className="flex gap-2">
        <div className="w-full">
          <input
            type="date"
            value={task.date}
            onChange={(e) => {
              updateTask("date", e.target.value);
              console.log(e.target.value);
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xs dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
};

DatePicker.displayName = "DatePicker";

DatePicker.propTypes = {
  updateTask: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
};

// Extracted PriorityPicker component
//
//
//
//
//
//
//
//
//
//
//
//
//
//
const PriorityPicker = ({
  showPriorityPicker,
  onPrioritySelect,
  selectedPriority,
}) => {
  return (
    showPriorityPicker && (
      <div className="ring-opacity-5 absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg focus:outline-none dark:bg-gray-800">
        <div className="py-1">
          {["High", "Medium", "Low"].map((priority) => (
            <button
              key={priority}
              onClick={() => onPrioritySelect(priority)}
              className={`flex w-full items-center px-4 py-2 text-sm ${
                selectedPriority === priority
                  ? "bg-indigo-50 text-indigo-900 dark:bg-indigo-900 dark:text-indigo-100"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {priority}
            </button>
          ))}
        </div>
      </div>
    )
  );
};

PriorityPicker.displayName = "PriorityPicker";

PriorityPicker.propTypes = {
  showPriorityPicker: PropTypes.bool.isRequired,
  onPrioritySelect: PropTypes.func.isRequired,
  selectedPriority: PropTypes.string.isRequired,
};

// Main component
//
//
//
//
//
//
//
//
//
//
//
//
//
//

const AddTaskForm = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.addForm.isOpen);
  const tasks = useSelector((state) => state.tasks);
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [showPriorityPicker, setShowPriorityPicker] = useState(false);
  const todayDate = new Date().toISOString().split("T")[0];

  // Split date and time for better control

  const [task, setTask] = useState({
    text: "",
    category: "Personal",
    tags: [],
    partners: [],
    priority: "Medium",
    date: todayDate,
  });

  // Get unique categories, tags, and partners for suggestions
  const uniqueTags = [...new Set(tasks.flatMap((t) => t.tags || []))];
  const uniquePartners = [...new Set(tasks.flatMap((t) => t.partners || []))];
  const uniqueCategories = [...new Set(tasks.flatMap((t) => t.category || []))];

  // For suggestions display
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionType, setSuggestionType] = useState(null); // 'tag', 'person', or 'category'
  const [typingPosition, setTypingPosition] = useState(null);

  // Update task state helper
  const [categorySelection, setCategorySelection] = useState(false);
  const updateTask = (field, value) => {
    setTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const textWithoutTags = inputValue
        .replace(/#(\S+)/g, "")
        .replace(/\+(\S+)/g, "")
        .trim();
      const tagMatches = inputValue.match(/#(\S+)/g) || [];
      const tags = tagMatches.map((tag) => tag.substring(1));
      const partnerMatches = inputValue.match(/\+(\S+)/g) || [];
      const partners = partnerMatches.map((partner) => partner.substring(1));

      // Create the updated task outside of setState
      const updatedTask = {
        ...task,
        text: textWithoutTags,
        tags: [...new Set([...task.tags, ...tags])].slice(0, 5),
        partners: [...new Set([...task.partners, ...partners])].slice(0, 5),
      };

      // Dispatch only once
      dispatch(addTasks({ ...updatedTask }));
      dispatch(closeAddForm());

      // Reset form state
      setTask({
        text: "",
        tags: [],
        partners: [],
        category: "Personal",
        priority: "Medium",
        date: todayDate,
      });
      setInputValue("");
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Check for tag suggestions after typing #
    const hashTagMatch = value.match(/#(\S*)$/);
    if (hashTagMatch) {
      const tagQuery = hashTagMatch[1].toLowerCase();
      setSuggestions(
        uniqueTags
          .filter((tag) => tag.toLowerCase().includes(tagQuery))
          .filter((tag) => !task.tags.includes(tag)),
      );
      setSuggestionType("tag");
      setShowSuggestions(true);
      setActiveSuggestion(0);
      setTypingPosition(e.target.selectionStart);
      return;
    }

    // Check for collaborator suggestions after typing +
    const plusMatch = value.match(/\+(\S*)$/);
    if (plusMatch) {
      const personQuery = plusMatch[1].toLowerCase();
      setSuggestions(
        uniquePartners
          .filter((person) => person.toLowerCase().includes(personQuery))
          .filter((person) => !task.partners.includes(person)),
      );
      setSuggestionType("person");
      setShowSuggestions(true);
      setActiveSuggestion(0);
      setTypingPosition(e.target.selectionStart);
      return;
    }

    // Hide suggestions if no match
    setShowSuggestions(false);
  };
  // Handle Enter key or selection from suggestions
  const handleKeyDown = (e) => {
    // If suggestions are showing
    if (showSuggestions && suggestions.length > 0) {
      // Navigate through suggestions with arrow keys
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveSuggestion((prev) =>
          Math.min(prev + 1, suggestions.length - 1),
        );
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveSuggestion((prev) => Math.max(prev - 1, 0));
        return;
      }

      // Select suggestion with Enter or Tab
      if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        const selectedItem = suggestions[activeSuggestion];

        if (suggestionType === "tag") {
          const beforeHash = inputValue.substring(
            0,
            inputValue.lastIndexOf("#"),
          );
          const afterHash = inputValue.substring(typingPosition);
          setInputValue(`${beforeHash}#${selectedItem}${afterHash}`);
        } else if (suggestionType === "person") {
          const beforePlus = inputValue.substring(
            0,
            inputValue.lastIndexOf("+"),
          );
          const afterPlus = inputValue.substring(typingPosition);
          setInputValue(`${beforePlus}+${selectedItem}${afterPlus}`);
        }

        setShowSuggestions(false);
        return;
      }
    }

    // Process the task when Enter is pressed (without holding shift)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (inputValue.trim()) {
        handleSubmit(e);
      }
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    if (suggestionType === "tag") {
      const beforeHash = inputValue.substring(0, inputValue.lastIndexOf("#"));
      setInputValue(`${beforeHash}#${suggestion} `);
    } else if (suggestionType === "person") {
      const beforePlus = inputValue.substring(0, inputValue.lastIndexOf("+"));
      setInputValue(`${beforePlus}+${suggestion} `);
    }

    setShowSuggestions(false);
    inputRef.current.focus();
  };

  // Handle priority selection
  const handlePrioritySelect = (priority) => {
    updateTask("priority", priority);
    setShowPriorityPicker(false);
  };

  const getPriorityColor = () => {
    const p = task.priority?.toLowerCase();
    if (p === "high") return "text-red-600 dark:text-red-400";
    if (p === "low") return "text-green-600 dark:text-green-400";
    return "text-yellow-600 dark:text-yellow-400";
  };

  const getPriorityBgColor = () => {
    const p = task.priority?.toLowerCase();
    if (p === "high") return "bg-red-50 dark:bg-red-900";
    if (p === "low") return "bg-green-50 dark:bg-green-900";
    return "bg-yellow-50 dark:bg-yellow-900";
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6 backdrop-blur-md">
        <form
          onSubmit={handleSubmit}
          className="relative w-96 space-y-6 rounded-lg bg-white p-6 shadow-xl md:w-auto dark:bg-gray-700 dark:shadow-xl dark:shadow-gray-900"
        >
          <button
            type="button"
            onClick={() => {
              dispatch(closeAddForm());
              setTask({
                text: "",
                category: "Personal",
                tags: [],
                partners: [],
                priority: "Medium",
                date: todayDate,
              });
            }}
            className="absolute top-2 right-2 z-10 rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            <MdClose className="h-6 w-6" />
          </button>

          {/* Smart input with natural language processing */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder='Try "Buy milk #grocery +John"'
            className="block w-full rounded-md bg-transparent transition-colors focus:outline-none dark:text-white dark:placeholder-gray-400"
          />

          {showSuggestions && (
            <SuggestionList
              suggestions={suggestions}
              activeSuggestion={activeSuggestion}
              onSelect={handleSuggestionClick}
              suggestionType={suggestionType}
            />
          )}

          {/* Task details section with improved spacing and organization */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Task category */}
            <div
              onClick={() => {
                setCategorySelection((prev) => !prev);
              }}
              className="relative"
            >
              <div className="relative flex w-full items-center">
                <input
                  type="text"
                  value={task.category}
                  onChange={(e) => updateTask("category", e.target.value)}
                  placeholder="Type category..."
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                />
                <button
                  type="button"
                  className="absolute right-0 flex items-center justify-center rounded-r-lg bg-gray-200 p-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCategorySelection((prev) => !prev);
                  }}
                >
                  <IoIosArrowDown
                    className={`transition-transform ${categorySelection ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
              {categorySelection && (
                <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg focus:outline-none dark:bg-gray-800">
                  {uniqueCategories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateTask("category", category);
                        setCategorySelection(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-900 dark:text-gray-300 dark:hover:bg-indigo-900 dark:hover:text-indigo-100"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Priority selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowPriorityPicker(!showPriorityPicker)}
                className={`hover:bg-opacity-80 dark:hover:bg-opacity-90 flex w-full items-center rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium shadow-sm transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 ${getPriorityBgColor()}`}
              >
                <FaRegFlag className={`mr-2 ${getPriorityColor()}`} />
                <span className={`font-medium ${getPriorityColor()}`}>
                  {task.priority}
                </span>
                <IoIosArrowDown className="ml-auto" />
              </button>
              <PriorityPicker
                showPriorityPicker={showPriorityPicker}
                onPrioritySelect={handlePrioritySelect}
                selectedPriority={task.priority}
              />
            </div>
          </div>

          <DatePicker task={task} updateTask={updateTask} />

          {/* Add Task button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none dark:bg-indigo-700 dark:hover:bg-indigo-800"
            >
              <MdAdd className="mr-2 text-lg" />
              Add Task
            </button>
          </div>
        </form>
      </div>
    )
  );
};

AddTaskForm.displayName = "AddTaskForm";

export default AddTaskForm;
