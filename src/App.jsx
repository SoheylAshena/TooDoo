import { Provider } from "react-redux";
import { store } from "./context/store";
import SideBar from "./components/SideBar/SideBar";
import MainBody from "./components/MainBody";
import AddTaskForm from "./components/AddTaskForm";
function App() {
  return (
    <Provider store={store}>
      <div className="mx-auto h-screen w-full max-w-[1600px] overflow-hidden">
        <SideBar />
        <MainBody />
        <AddTaskForm />
      </div>
    </Provider>
  );
}

export default App;
