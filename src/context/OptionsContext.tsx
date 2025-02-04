import { createContext } from "react";
import { Option } from "../types";

export enum SortTypeEnum {
  ASC = "ASC",
  DESC = "DESC",
}

export type OptionContextType = {
  options: Option[];
  saveOption: (title: string) => void;
  updateOption: (id: string, title: string) => void;
  deleteOption: (id: string) => void;
  suffleOptions: () => void;
  sortOptions: ({ sortType }: { sortType: SortTypeEnum }) => void;
  isSpinning: boolean;
  setIsSpinning: React.Dispatch<React.SetStateAction<boolean>>;
  canSpin: boolean;
  setCanSpin: React.Dispatch<React.SetStateAction<boolean>>;
  editItem: string | null;
  setEditItem: React.Dispatch<React.SetStateAction<string | null>>;
};

export const OptionContext = createContext<OptionContextType | null>(null);
