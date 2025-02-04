import { useState } from "react";
import { initialRouletteData } from "../constants";
import { v4 as uuidv4 } from "uuid";
import { Option } from "../types";
import { OptionContext, SortTypeEnum } from "./OptionsContext";

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

  const sortOptions = ({ sortType }: { sortType: SortTypeEnum }) => {
    if (isSpinning || options.length <= 1 || editItem) return;

    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];

      if (sortType === SortTypeEnum.ASC) {
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
