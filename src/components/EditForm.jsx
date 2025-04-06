import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../context/Slices/tasksSlice";
import PropTypes from "prop-types";

const CustomDropdown = ({
  label,
  options,
  value,
  onChange,
  onAddNew,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="mb-2 block text-sm font-medium text-gray-600">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-left text-gray-700 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-100 focus:outline-none"
        >
          <span className="block truncate">{value || placeholder}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        {isOpen && (
          <div className="ring-opacity-5 absolute z-10 mt-1 w-full rounded-lg bg-white shadow-lg">
            {label === "Category" && (
              <div className="p-2">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none"
                  placeholder="Add a category..."
                />
              </div>
            )}
            <ul className="max-h-60 overflow-auto py-1 text-base">
              {filteredOptions.map((option) => (
                <li
                  key={option}
                  className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-blue-50"
                  onClick={() => {
                    onChange({
                      target: { name: label.toLowerCase(), value: option },
                    });
                    setIsOpen(false);
                  }}
                >
                  {option}
                </li>
              ))}
              {onAddNew && searchTerm && (
                <li
                  className="cursor-pointer border-t border-gray-100 px-4 py-2 text-blue-600 hover:bg-blue-50"
                  onClick={() => {
                    onAddNew(searchTerm);
                    setSearchTerm("");
                    setIsOpen(false);
                  }}
                >
                  + Add &quot;{searchTerm}&quot;
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

CustomDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onAddNew: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
};

CustomDropdown.defaultProps = {
  onAddNew: null,
};

const EditForm = ({ task, setEditing }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ ...task });

  const [tagInput, setTagInput] = useState("");
  const [partnerInput, setPartnerInput] = useState([]);
  const [customCategories, setCustomCategories] = useState([]);
  const [errors, setErrors] = useState({});

  const defaultCategories = [
    ...new Set(useSelector((state) => state.tasks.map((cat) => cat.category))),
  ];
  const categories = [...defaultCategories, ...customCategories];
  const priorities = ["Low", "Medium", "High"];

  const validate = () => {
    const newErrors = {};
    if (!formData.text.trim()) newErrors.text = "Task description is required";
    if (!formData.date) newErrors.date = "Due date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleAddCategory = (newCategory) => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCustomCategories([...customCategories, newCategory.trim()]);
      setFormData({ ...formData, category: newCategory.trim() });
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  const handleAddPartner = () => {
    if (
      partnerInput.trim() &&
      !formData.partners.includes(partnerInput.trim())
    ) {
      setFormData({
        ...formData,
        partners: [...formData.partners, partnerInput.trim()],
      });
      setPartnerInput("");
    }
  };

  const handleRemovePartner = (partner) => {
    setFormData({
      ...formData,
      partners: formData.partners.filter((p) => p !== partner),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(updateTask(formData));
      setEditing(false);
    }
  };
  console.log(formData.date);
  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="max-h-[70%] w-[90%] max-w-2xl overflow-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-700">Edit Task</h2>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600">
              Task Description*
            </label>
            <input
              type="text"
              name="text"
              value={formData.text}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-3 ${
                errors.text
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200 bg-white"
              } text-gray-700 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-100 focus:outline-none`}
              placeholder="What needs to be done?"
            />
            {errors.text && (
              <p className="mt-1 text-sm text-red-500">{errors.text}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <CustomDropdown
              label="Category"
              options={categories}
              value={formData.category}
              onChange={handleChange}
              onAddNew={handleAddCategory}
              placeholder="Select a category"
            />

            <CustomDropdown
              label="Priority"
              options={priorities}
              value={formData.priority}
              onChange={handleChange}
              placeholder="Select priority"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600">
              Due Date*
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-3 ${
                errors.date
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200 bg-white"
              } text-gray-700 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-100 focus:outline-none`}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-500">{errors.date}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600">
              Tags
            </label>
            <div className="flex items-center">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddTag())
                }
                className="flex-grow rounded-l-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-100 focus:outline-none"
                placeholder="Add a tag"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="rounded-r-lg bg-blue-500 px-5 py-3 text-white shadow-sm transition-colors hover:bg-blue-600 focus:ring focus:ring-blue-100 focus:outline-none"
              >
                Add
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full text-blue-500 hover:bg-blue-200 hover:text-blue-700 focus:outline-none"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600">
              Partners
            </label>
            <div className="flex items-center">
              <input
                type="text"
                value={partnerInput}
                onChange={(e) => setPartnerInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddPartner())
                }
                className="flex-grow rounded-l-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-100 focus:outline-none"
                placeholder="Add a partner"
              />
              <button
                type="button"
                onClick={handleAddPartner}
                className="rounded-r-lg bg-purple-500 px-5 py-3 text-white shadow-sm transition-colors hover:bg-purple-600 focus:ring focus:ring-purple-100 focus:outline-none"
              >
                Add
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {formData.partners.map((partner) => (
                <span
                  key={partner}
                  className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-600"
                >
                  {partner}
                  <button
                    type="button"
                    onClick={() => handleRemovePartner(partner)}
                    className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full text-purple-500 hover:bg-purple-200 hover:text-purple-700 focus:outline-none"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 font-medium text-white shadow-md transition-all hover:from-blue-600 hover:to-purple-600 hover:shadow-lg focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 focus:outline-none"
            >
              Submit{" "}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="flex-1 rounded-lg bg-gray-100 px-6 py-3 font-medium text-gray-700 shadow-md transition-all hover:bg-gray-200 hover:shadow-lg focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditForm.propTypes = {
  setEditing: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
};

export default EditForm;
