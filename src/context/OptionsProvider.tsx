import { useState } from "react";
import { initialRouletteData } from "../constants";
import { v4 as uuidv4 } from "uuid";
import { Option } from "../types";
import {
  OptionContext,
  OptionContextType,
  SortTypeEnum,
} from "./OptionsContext";

const OptionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [canSpin, setCanSpin] = useState(true);
  const [editItem, setEditItem] = useState<string | null>(null);
  const [sortType, setSortType] = useState<SortTypeEnum | null>(null);

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

  const sortOptions = () => {
    if (isSpinning || options.length <= 1 || editItem) return;

    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];

      if (sortType === SortTypeEnum.ASC) {
        setSortType(SortTypeEnum.DESC);
        return newOptions.sort((a, b) => a.title.localeCompare(b.title));
      } else {
        setSortType(SortTypeEnum.ASC);
        return newOptions.sort((a, b) => b.title.localeCompare(a.title));
      }
    });
  };

  const value: OptionContextType = {
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
    sortType,
  };

  return (
    <OptionContext.Provider value={value}>{children}</OptionContext.Provider>
  );
};

export default OptionsProvider;
