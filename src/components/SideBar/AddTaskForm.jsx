import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { addTasks } from "../../context/Slices/tasksSlice";
import { FaRegCalendarAlt, FaRegFlag, FaTimes } from "react-icons/fa";
import { MdOutlineLabel, MdClose, MdPerson, MdAdd } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const AddTaskForm = ({ onClose }) => {
  const dispatch = useDispatch();
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
  const updateTask = (field, value) => {
    setTask((prev) => ({ ...prev, [field]: value }));
  };

  // Process input to extract tags and partners
  const processInput = (text) => {
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
  };

  // Focus the input field when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
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
  };

  // Handle priority selection
  const handlePrioritySelect = (priority) => {
    updateTask("priority", priority);
    setShowPriorityPicker(false);
  };

  // Remove tag or partner
  const removeItem = (type, item) => {
    updateTask(
      type,
      task[type].filter((i) => i !== item),
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
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

    setTask({
      text: "",
      category: "Personal",
      tags: [],
      partners: [],
      priority: "Medium",
      date: new Date().toISOString().slice(0, 16),
    });

    onClose();
  };

  // Get priority color
  const getPriorityColor = () => {
    switch (task.priority) {
      case "High":
        return "text-red-500";
      case "Low":
        return "text-green-500";
      default:
        return "text-yellow-500";
    }
  };

  // Get priority background color
  const getPriorityBgColor = () => {
    switch (task.priority) {
      case "High":
        return "bg-red-50";
      case "Low":
        return "bg-green-50";
      default:
        return "bg-yellow-50";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-800">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Add New Task
            </span>
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 transition-all hover:bg-gray-200 hover:text-gray-600"
          >
            <MdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Smart Input */}
          <div className="relative mb-6">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="What needs to be done? Use # for tags and + for people"
              className="w-full rounded-xl border border-transparent bg-gray-50 px-5 py-4 text-lg font-medium placeholder-gray-400 shadow-sm transition-all focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />

            {/* Suggestions */}
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 mt-1 rounded-lg bg-white py-2 shadow-lg ring-1 ring-gray-200 backdrop-blur-lg"
                >
                  {suggestions.slice(0, 5).map((suggestion, index) => (
                    <div
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`flex cursor-pointer items-center px-4 py-2 transition-colors ${
                        index === activeSuggestion
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {suggestionType === "tag" && (
                        <span className="mr-2 text-indigo-500">#</span>
                      )}
                      {suggestionType === "person" && (
                        <span className="mr-2 text-green-500">+</span>
                      )}
                      {suggestionType === "category" && (
                        <span className="mr-2 text-gray-500">in</span>
                      )}
                      {suggestion}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Task Preview */}
          <AnimatePresence>
            {task.text && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md"
              >
                <h3 className="mb-3 text-lg font-semibold text-gray-800">
                  {task.text}
                </h3>

                <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                  <span className="rounded-md bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 shadow-sm">
                    {task.category}
                  </span>

                  {task.date && (
                    <span className="flex items-center rounded-md bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 shadow-sm">
                      <FaRegCalendarAlt className="mr-1" />
                      {new Date(task.date).toLocaleDateString()}
                    </span>
                  )}

                  <span
                    className={`flex items-center rounded-md px-3 py-1 text-xs font-medium shadow-sm ${getPriorityBgColor()} ${getPriorityColor()}`}
                  >
                    <FaRegFlag className="mr-1" />
                    {task.priority}
                  </span>
                </div>

                {/* Tags and Partners */}
                <div className="flex flex-wrap gap-2">
                  {task.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700 shadow-sm transition-colors hover:bg-indigo-200"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeItem("tags", tag)}
                        className="ml-1.5 rounded-full p-0.5 text-indigo-400 transition-colors hover:bg-indigo-200 hover:text-indigo-700"
                      >
                        <FaTimes size={10} />
                      </button>
                    </motion.span>
                  ))}

                  {task.partners.map((partner) => (
                    <motion.span
                      key={partner}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 shadow-sm transition-colors hover:bg-green-200"
                    >
                      +{partner}
                      <button
                        type="button"
                        onClick={() => removeItem("partners", partner)}
                        className="ml-1.5 rounded-full p-0.5 text-green-400 transition-colors hover:bg-green-200 hover:text-green-700"
                      >
                        <FaTimes size={10} />
                      </button>
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Due Date Picker */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="flex items-center rounded-xl bg-blue-50 px-3.5 py-2.5 text-sm font-medium text-blue-600 shadow-sm transition-all hover:bg-blue-100"
              >
                <FaRegCalendarAlt className="mr-2" />
                Due Date
                <IoIosArrowDown className="ml-2 text-blue-400" size={14} />
              </button>

              <AnimatePresence>
                {showDatePicker && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 top-full z-10 mt-1 w-64 rounded-lg bg-white p-3 shadow-lg ring-1 ring-gray-200"
                  >
                    <input
                      type="datetime-local"
                      name="date"
                      value={task.date}
                      onChange={(e) => updateTask("date", e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
                    />
                    <div className="mt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setShowDatePicker(false)}
                        className="rounded-md bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-100"
                      >
                        Apply
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Priority Picker */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowPriorityPicker(!showPriorityPicker)}
                className={`flex items-center rounded-xl px-3.5 py-2.5 text-sm font-medium shadow-sm transition-all hover:opacity-90 ${getPriorityBgColor()} ${getPriorityColor()}`}
              >
                <FaRegFlag className="mr-2" />
                Priority
                <IoIosArrowDown className="ml-2 opacity-70" size={14} />
              </button>

              <AnimatePresence>
                {showPriorityPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 top-full z-10 mt-1 w-40 overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-200"
                  >
                    <button
                      type="button"
                      onClick={() => handlePrioritySelect("High")}
                      className="flex w-full items-center border-l-4 border-red-500 bg-red-50 px-4 py-2.5 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                    >
                      <FaRegFlag className="mr-3" />
                      High
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePrioritySelect("Medium")}
                      className="flex w-full items-center border-l-4 border-yellow-500 bg-yellow-50 px-4 py-2.5 text-left text-sm font-medium text-yellow-600 transition-colors hover:bg-yellow-100"
                    >
                      <FaRegFlag className="mr-3" />
                      Medium
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePrioritySelect("Low")}
                      className="flex w-full items-center border-l-4 border-green-500 bg-green-50 px-4 py-2.5 text-left text-sm font-medium text-green-600 transition-colors hover:bg-green-100"
                    >
                      <FaRegFlag className="mr-3" />
                      Low
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Label Button */}
            <button
              type="button"
              className="flex items-center rounded-xl bg-purple-50 px-3.5 py-2.5 text-sm font-medium text-purple-600 shadow-sm transition-all hover:bg-purple-100"
            >
              <MdOutlineLabel className="mr-2" />
              Labels
            </button>

            {/* Collaborator Button */}
            <button
              type="button"
              className="flex items-center rounded-xl bg-green-50 px-3.5 py-2.5 text-sm font-medium text-green-600 shadow-sm transition-all hover:bg-green-100"
            >
              <MdPerson className="mr-2" />
              Assign
            </button>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 font-medium text-white shadow-sm transition-all hover:opacity-90 hover:shadow-md"
            >
              <MdAdd className="mr-1" size={18} />
              Add Task
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

AddTaskForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddTaskForm;
