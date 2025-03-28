import { useState, useRef, useEffect, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { addTasks } from "../context/Slices/tasksSlice";
import { FaRegCalendarAlt, FaRegFlag, FaTimes } from "react-icons/fa";
import { MdClose, MdAdd } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { closeAddForm } from "../context/Slices/addFormSlice";

// Extracted suggestion list component
const SuggestionList = memo(
  ({ suggestions, activeSuggestion, onSelect, suggestionType }) => {
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
  },
);

SuggestionList.displayName = "SuggestionList";

SuggestionList.propTypes = {
  suggestions: PropTypes.array.isRequired,
  activeSuggestion: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  suggestionType: PropTypes.string.isRequired,
};

// Extracted DatePicker component
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

const DatePicker = memo(({ date, onDateChange }) => (
  <div className="mt-2 rounded-md border border-gray-300 p-3 dark:border-gray-700">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      Select Due Date & Time
    </label>
    <input
      type="datetime-local"
      value={date}
      onChange={(e) => onDateChange(e.target.value)}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
    />
  </div>
));

DatePicker.displayName = "DatePicker";

DatePicker.propTypes = {
  date: PropTypes.string.isRequired,
  onDateChange: PropTypes.func.isRequired,
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
const PriorityPicker = memo(
  ({ showPriorityPicker, onPrioritySelect, selectedPriority }) => {
    const priorityColors = {
      High: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      Medium:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      Low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    };

    return (
      showPriorityPicker && (
        <div className="ring-opacity-5 absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none dark:bg-gray-800">
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
                <span
                  className={`mr-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                    priorityColors[priority]
                  }`}
                >
                  {priority}
                </span>
              </button>
            ))}
          </div>
        </div>
      )
    );
  },
);

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

const AddTaskForm = memo(() => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.addForm.isOpen);
  const tasks = useSelector((state) => state.tasks);
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPriorityPicker, setShowPriorityPicker] = useState(false);
  const [task, setTask] = useState({
    text: "",
    category: "Personal",
    tags: [],
    partners: [],
    priority: "Medium",
    date: new Date().toISOString().slice(0, 16),
  });

  // Get unique categories, tags, and partners for suggestions
  const uniqueCategories = [...new Set(tasks.map((t) => t.category))];
  const uniqueTags = [...new Set(tasks.flatMap((t) => t.tags || []))];
  const uniquePartners = [...new Set(tasks.flatMap((t) => t.partners || []))];

  // For suggestions display
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionType, setSuggestionType] = useState(null); // 'tag', 'person', or 'category'
  const [typingPosition, setTypingPosition] = useState(null);

  // Update task state helper
  const updateTask = useCallback((field, value) => {
    setTask((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Process input to extract tags and partners
  const processInput = useCallback(
    (text) => {
      const textWithoutTags = text
        .replace(/#(\S+)/g, "")
        .replace(/\+(\S+)/g, "")
        .trim();

      // Extract tags with #
      const tagMatches = text.match(/#(\S+)/g) || [];
      const tags = tagMatches.map((tag) => tag.substring(1));

      // Extract collaborators with +
      const partnerMatches = text.match(/\+(\S+)/g) || [];
      const partners = partnerMatches.map((partner) => partner.substring(1));

      // Detect category using "in" keyword (e.g., "Buy milk in Groceries")
      const categoryMatch = text.match(/\sin\s(\S+)(?=\s|$)/);
      const category = categoryMatch ? categoryMatch[1] : task.category;

      // Update task state
      updateTask("text", textWithoutTags);
      updateTask("tags", [...new Set([...task.tags, ...tags])].slice(0, 5));
      updateTask(
        "partners",
        [...new Set([...task.partners, ...partners])].slice(0, 5),
      );
      updateTask("category", category);

      // Clear input
      setInputValue("");
    },
    [task, updateTask],
  );

  // Handle input change
  const handleInputChange = useCallback(
    (e) => {
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

      // Check for category suggestions after typing "in "
      const inMatch = value.match(/\sin\s(\S*)$/);
      if (inMatch) {
        const categoryQuery = inMatch[1].toLowerCase();
        setSuggestions(
          uniqueCategories.filter((category) =>
            category.toLowerCase().includes(categoryQuery),
          ),
        );
        setSuggestionType("category");
        setShowSuggestions(true);
        setActiveSuggestion(0);
        setTypingPosition(e.target.selectionStart);
        return;
      }

      // Hide suggestions if no match
      setShowSuggestions(false);
    },
    [uniqueTags, uniquePartners, uniqueCategories, task.tags, task.partners],
  );

  // Handle Enter key or selection from suggestions
  const handleKeyDown = useCallback(
    (e) => {
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
          } else if (suggestionType === "category") {
            const beforeIn = inputValue.substring(
              0,
              inputValue.lastIndexOf("in "),
            );
            const afterIn = inputValue.substring(typingPosition);
            setInputValue(`${beforeIn}in ${selectedItem}${afterIn}`);
          }

          setShowSuggestions(false);
          return;
        }
      }

      // Process the task when Enter is pressed (without holding shift)
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();

        if (inputValue.trim()) {
          processInput(inputValue);
        } else if (task.text.trim()) {
          // If the smart input is empty but we have task text, submit the form
          handleSubmit(e);
        }
      }
    },
    [
      showSuggestions,
      suggestions,
      activeSuggestion,
      suggestionType,
      inputValue,
      typingPosition,
      task.text,
      processInput,
    ],
  );

  // Focus the input field when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle suggestion click
  const handleSuggestionClick = useCallback(
    (suggestion) => {
      if (suggestionType === "tag") {
        const beforeHash = inputValue.substring(0, inputValue.lastIndexOf("#"));
        setInputValue(`${beforeHash}#${suggestion} `);
      } else if (suggestionType === "person") {
        const beforePlus = inputValue.substring(0, inputValue.lastIndexOf("+"));
        setInputValue(`${beforePlus}+${suggestion} `);
      } else if (suggestionType === "category") {
        const beforeIn = inputValue.substring(0, inputValue.lastIndexOf("in "));
        setInputValue(`${beforeIn}in ${suggestion} `);
      }

      setShowSuggestions(false);
      inputRef.current.focus();
    },
    [suggestionType, inputValue],
  );

  // Handle priority selection
  const handlePrioritySelect = useCallback(
    (priority) => {
      updateTask("priority", priority);
      setShowPriorityPicker(false);
    },
    [updateTask],
  );

  // Remove tag or partner
  const removeItem = useCallback(
    (type, item) => {
      updateTask(
        type,
        task[type].filter((i) => i !== item),
      );
    },
    [task, updateTask],
  );

  // Handle form submission
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // Process any remaining input
      if (inputValue.trim()) {
        processInput(inputValue);
      }

      if (!task.text.trim()) return;

      dispatch(
        addTasks({
          ...task,
          text: task.text.trim(),
          date: task.date || new Date().toISOString(),
        }),
      );
    },
    [inputValue, task, processInput, dispatch],
  );

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
      <div
        className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/30 backdrop-blur-sm"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="w-full max-w-lg transform rounded-xl bg-white p-6 shadow-2xl transition-all sm:my-8 dark:bg-gray-800">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add New Task
              </h3>
              <button
                type="button"
                onClick={() => dispatch(closeAddForm())}
                className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:hover:bg-gray-700 dark:hover:text-gray-200"
              >
                <MdClose className="h-6 w-6" />
              </button>
            </div>

            {/* Smart input with natural language processing */}
            <div className="relative">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Quick Add
                <span className="ml-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                  (use # for tags, + for people, &quot;in Category&quot; for
                  categories)
                </span>
              </label>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder='Try "Buy milk #grocery +John in Shopping"'
                className="focus:ring-opacity-30 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 shadow-sm transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
              {showSuggestions && (
                <SuggestionList
                  suggestions={suggestions}
                  activeSuggestion={activeSuggestion}
                  onSelect={handleSuggestionClick}
                  suggestionType={suggestionType}
                />
              )}
            </div>

            {/* Task input */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Task Description
              </label>
              <input
                type="text"
                value={task.text}
                onChange={(e) => updateTask("text", e.target.value)}
                placeholder="What needs to be done?"
                className="focus:ring-opacity-30 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 shadow-sm transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
            </div>

            {/* Task category */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category
              </label>
              <input
                type="text"
                value={task.category}
                onChange={(e) => updateTask("category", e.target.value)}
                placeholder="Category"
                className="focus:ring-opacity-30 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 shadow-sm transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />
            </div>

            {/* Selected tags/partners display */}
            <div className="flex flex-wrap gap-2">
              {task.tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center rounded-full bg-indigo-100 px-3 py-1.5 text-sm transition-colors hover:bg-indigo-200 dark:bg-indigo-900 dark:hover:bg-indigo-800"
                >
                  <span className="font-medium text-indigo-800 dark:text-indigo-200">
                    #{tag}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeItem("tags", tag)}
                    className="ml-1.5 rounded-full p-0.5 text-indigo-400 hover:bg-indigo-300 hover:text-indigo-700 focus:outline-none dark:text-indigo-300 dark:hover:bg-indigo-700 dark:hover:text-indigo-100"
                  >
                    <FaTimes className="h-3 w-3" />
                  </button>
                </div>
              ))}

              {task.partners.map((partner) => (
                <div
                  key={partner}
                  className="flex items-center rounded-full bg-purple-100 px-3 py-1.5 text-sm transition-colors hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800"
                >
                  <span className="font-medium text-purple-800 dark:text-purple-200">
                    +{partner}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeItem("partners", partner)}
                    className="ml-1.5 rounded-full p-0.5 text-purple-400 hover:bg-purple-300 hover:text-purple-700 focus:outline-none dark:text-purple-300 dark:hover:bg-purple-700 dark:hover:text-purple-100"
                  >
                    <FaTimes className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap justify-between gap-3">
              {/* Left side buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  <FaRegCalendarAlt className="mr-2 text-indigo-500 dark:text-indigo-400" />
                  {showDatePicker ? "Hide Date" : "Set Date"}
                </button>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowPriorityPicker(!showPriorityPicker)}
                    className={`hover:bg-opacity-80 dark:hover:bg-opacity-90 flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium shadow-sm transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 ${getPriorityBgColor()}`}
                  >
                    <FaRegFlag className={`mr-2 ${getPriorityColor()}`} />
                    <span className={`font-medium ${getPriorityColor()}`}>
                      {task.priority}
                    </span>
                    <IoIosArrowDown className="ml-2" />
                  </button>
                  <PriorityPicker
                    showPriorityPicker={showPriorityPicker}
                    onPrioritySelect={handlePrioritySelect}
                    selectedPriority={task.priority}
                  />
                </div>
              </div>

              {/* Right side - Add button */}
              <button
                type="submit"
                className="inline-flex items-center rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none dark:bg-indigo-700 dark:hover:bg-indigo-800"
              >
                <MdAdd className="mr-2 text-lg" />
                Add Task
              </button>
            </div>

            {/* Date picker */}
            {showDatePicker && (
              <DatePicker
                date={task.date}
                onDateChange={(value) => updateTask("date", value)}
              />
            )}
          </form>
        </div>
      </div>
    )
  );
});

AddTaskForm.displayName = "AddTaskForm";

export default AddTaskForm;
