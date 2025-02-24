import Navbar from "./components/Navbar.jsx";
import Projects from "./components/Projects.jsx";
import Tasks from "./components/Tasks.jsx";

function App() {

  return (
    <>
        <div>
            <Navbar/>
            <div className="p-4">
                <Projects/>
                <Tasks/>
            </div>
        </div>
    </>
  );
}

export default App;
