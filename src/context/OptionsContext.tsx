import { createContext, useState } from "react";
import { Option } from "../types";
import { initialRouletteData } from "../constants";
import { v4 as uuidv4 } from "uuid";

export type OptionContextType = {
  options: Option[];
  saveOption: (title: string) => void;
  updateOption: (id: string, title: string) => void;
  deleteOption: (id: string) => void;
  suffleOptions: () => void;
  sortOptions: ({ sortType }: { sortType: "asc" | "desc" }) => void;
  isSpinning: boolean;
  setIsSpinning: React.Dispatch<React.SetStateAction<boolean>>;
  canSpin: boolean;
  setCanSpin: React.Dispatch<React.SetStateAction<boolean>>;
  editItem: string | null;
  setEditItem: React.Dispatch<React.SetStateAction<string | null>>;
};

export const OptionContext = createContext<OptionContextType | null>(null);

const OptionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [canSpin, setCanSpin] = useState(true);
  const [editItem, setEditItem] = useState<string | null>(null);

  const [options, setOptions] = useState<Option[]>(initialRouletteData);

  const saveOption = (title: string) => {
    setOptions([
      ...options,
      {
        id: uuidv4(),
        title,
      },
    ]);
  };

  const updateOption = (id: string, title: string) => {
    setOptions((prevOptions) => {
      return prevOptions.map((it) => (it.id === id ? { ...it, title } : it));
    });
  };

  const deleteOption = (id: string) => {
    setOptions((prevOptions) => {
      return prevOptions.filter((it) => it.id !== id);
    });
  };

  const suffleOptions = () => {
    if (isSpinning || options.length <= 1 || editItem) return;

    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];

      return newOptions.sort(() => Math.random() - 0.5);
    });
  };

  const sortOptions = ({ sortType }: { sortType: "asc" | "desc" }) => {
    if (isSpinning || options.length <= 1 || editItem) return;

    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];

      if (sortType === "asc") {
        return newOptions.sort((a, b) => b.title.localeCompare(a.title));
      } else {
        return newOptions.sort((a, b) => a.title.localeCompare(b.title));
      }
    });
  };

  return (
    <OptionContext.Provider
      value={{
        options,
        saveOption,
        updateOption,
        deleteOption,
        suffleOptions,
        sortOptions,
        isSpinning,
        setIsSpinning,
        canSpin,
        setCanSpin,
        editItem,
        setEditItem,
      }}
    >
      {children}
    </OptionContext.Provider>
  );
};

export default OptionsProvider;
