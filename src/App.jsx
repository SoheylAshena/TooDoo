import SideBar from '@/components/SideBar';
import MainView from '@/components/MainView';
import AddTaskForm from '@/components/AddTaskForm/AddTaskForm';
function App() {
  return (
    <main className="mx-auto flex h-screen w-full">
      <SideBar />
      <MainView />
      <AddTaskForm />
    </main>
  );
}

export default App;
