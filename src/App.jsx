import SideBar from "./components/SideBar/SideBar";
import MainBody from "./components/MainBody";
import { Provider } from "react-redux";
import { store } from "./context/store";

function App() {
  return (
    <Provider store={store}>
      <div className="flex min-h-screen items-center justify-center bg-blue-400">
        <div className="mx-auto flex h-[90vh] w-[90vw] overflow-hidden rounded-lg">
          <SideBar />
          <MainBody />
        </div>
      </div>
    </Provider>
  );
}

export default App;
