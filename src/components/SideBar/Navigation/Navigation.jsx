import PropTypes from "prop-types";
import {
  FaPlus,
  FaCalendarDay,
  FaCalendarAlt,
  FaFilter,
  FaCheckCircle,
  FaExclamationCircle,
  FaInbox,
  FaChartBar,
  FaRegCircle,
  FaCalendarWeek,
} from "react-icons/fa";
import { BsClockHistory } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import NavigationSection from "./NavigationSection";
import NavItem from "./NavItem";
import NavButton from "./NavButton";
import { toggleAddForm } from "../../../context/Slices/addFormSlice";
import { useDispatch } from "react-redux";

const Navigation = ({ onClose }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-2">
      {/* Main menu items */}
      <NavigationSection>
        <NavItem
          icon={<FaInbox size={16} />}
          text="All Tasks"
          navItem="all"
          onClose={onClose}
        />
        <NavItem
          icon={<FaCalendarWeek size={16} />}
          text="Calendar View"
          navItem="calendar"
          onClose={onClose}
        />
        <NavButton
          icon={<FaPlus size={16} />}
          text="Add Task"
          onClick={() => {
            dispatch(toggleAddForm());
            onClose();
          }}
        />
      </NavigationSection>

      {/* Tasks by time */}
      <NavigationSection title="Time Frame">
        <NavItem
          icon={<FaCalendarDay size={16} />}
          text="Today"
          navItem="today"
          onClose={onClose}
        />
        <NavItem
          icon={<FaCalendarAlt size={16} />}
          text="Upcoming"
          navItem="upcoming"
          onClose={onClose}
        />
        <NavItem
          icon={<BsClockHistory size={16} />}
          text="Recently Added"
          navItem="recent"
          onClose={onClose}
        />
      </NavigationSection>

      {/* Tasks by status */}
      <NavigationSection title="Status">
        <NavItem
          icon={<FaCheckCircle size={16} />}
          text="Completed"
          navItem="completed"
          onClose={onClose}
        />
        <NavItem
          icon={<FaExclamationCircle size={16} />}
          text="High Priority"
          navItem="high"
          onClose={onClose}
        />
        <NavItem
          icon={<FaRegCircle size={16} />}
          text="Active"
          navItem="active"
          onClose={onClose}
        />
      </NavigationSection>

      {/* Other */}
      <NavigationSection title="Other">
        <NavButton
          icon={<FaFilter size={16} />}
          text="Filters & Labels"
          onClick={() => {
            console.log("Filters & Labels");
            onClose();
          }}
        />
        <NavButton
          icon={<FaChartBar size={16} />}
          text="Analytics"
          onClick={() => {
            console.log("Analytics");
            onClose();
          }}
        />
        <NavButton
          icon={<IoMdSettings size={16} />}
          text="Settings"
          onClick={() => {
            console.log("Settings");
            onClose();
          }}
        />
      </NavigationSection>
    </div>
  );
};

Navigation.propTypes = {
  onClose: PropTypes.func,
};

export default Navigation;
