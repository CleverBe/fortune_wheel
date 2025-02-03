import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { OptionsList } from "./components/OptionsList";
import { Roulette } from "./components/Roulette";

export interface Option {
  id: string;
  option: string;
}

const initialData: Option[] = [
  {
    id: uuidv4(),
    option: "Grace",
  },
  {
    id: uuidv4(),
    option: "Heidi",
  },
  {
    id: uuidv4(),
    option: "Ivan",
  },
  {
    id: uuidv4(),
    option: "Alice",
  },
  {
    id: uuidv4(),
    option: "Bob",
  },
  {
    id: uuidv4(),
    option: "Charlie",
  },
  {
    id: uuidv4(),
    option: "David",
  },
  {
    id: uuidv4(),
    option: "Eve",
  },
  {
    id: uuidv4(),
    option: "Frank",
  },
];

function App() {
  const [options, setOptions] = useState<Option[]>(initialData);
  const [mustSpin, setMustSpin] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-900 p-4 text-white">
      <h1 className="text-2xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
        Fortune Wheel
      </h1>
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <Roulette
          options={options}
          mustSpin={mustSpin}
          setMustSpin={setMustSpin}
        />
        <OptionsList
          options={options}
          setOptions={setOptions}
          isSpinning={mustSpin}
        />
      </div>
    </div>
  );
}

export default App;
