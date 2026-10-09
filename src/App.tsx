import { Sidebar } from "./components/Sidebar";
import ClassList from "./components/ClassList";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <ClassList sidebarOpen />
      </main>
    </div>
  );
}

export default App;
