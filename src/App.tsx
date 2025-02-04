import { Roulette } from "./components/Roulette";
import { Toaster } from "react-hot-toast";
import { OptionsSection } from "./components/OptionsSection";
import OptionsProvider from "./context/OptionsContext";

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-900 p-4 text-white">
      <h1 className="text-2xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
        Fortune Wheel
      </h1>
      <OptionsProvider>
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <Roulette />
          <OptionsSection />
        </div>
      </OptionsProvider>
      <Toaster />
    </div>
  );
}

export default App;
