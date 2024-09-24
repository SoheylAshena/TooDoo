function FilterButton(props) {
  return (
    <button
      type="button"
      className="m-1 w-full rounded-md bg-blue-500 p-2 font-semibold text-white"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span className="hidden">Show </span>
      <span>{props.name}</span>
      <span className="hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;
