import Profile from "./Profile";
import Navigation from "./Navigation";
import Category from "./Category";

const SideBar = () => {
  return (
    <>
      <div className="custom-scrollbar flex h-full w-96 flex-col gap-8 bg-white p-5">
        <Profile />
        <Navigation />
        <Category />
      </div>
    </>
  );
};

export default SideBar;
