import "./App.css";
import Chat from "./components/Chat";
import { ThemeToggle } from "./components/ThemeToggle";

function App() {
  return (
    <div className="app-container">
      <div className="chat-wrapper">
        <div className="text-right">
          <ThemeToggle />
        </div>
        <Chat />
      </div>
    </div>
  );
}

export default App;
