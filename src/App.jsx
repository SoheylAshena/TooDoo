import { Provider } from "react-redux";
import { store } from "./context/store";
import SideBar from "./components/SideBar/SideBar";
import MainBody from "./components/MainBody";

function App() {
  return (
    <Provider store={store}>
      <div className="flex min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
        <div className="mx-auto flex h-screen w-full max-w-[1600px] overflow-hidden">
          <SideBar />
          <div className="flex-1 overflow-auto">
            <MainBody />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
