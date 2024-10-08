import Chat from "./components/Chat";
import { ThemeToggle } from "./components/ThemeToggle";

function App() {
  return (
    <div className="h-screen w-screen p-10 flex flex-col">
      <div className="flex justify-end">
        <ThemeToggle />
      </div>
      <Chat />
    </div>
  );
}

export default App;
