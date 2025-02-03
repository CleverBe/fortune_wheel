import { Shuffle, SortAsc, SortDesc, Trash } from "lucide-react";
import { Option } from "../App";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface OptionsListProps {
  options: Option[];
  setOptions: React.Dispatch<React.SetStateAction<Option[]>>;
  isSpinning: boolean;
}

export const OptionsList = ({
  options,
  setOptions,
  isSpinning,
}: OptionsListProps) => {
  const [editItem, setEditItem] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [newOption, setNewOption] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [sortType, setSortType] = useState<"asc" | "desc" | null>(null);

  const suffleOptions = () => {
    if (isSpinning) return;

    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];

      return newOptions.sort(() => Math.random() - 0.5);
    });
  };

  const sortOptions = () => {
    if (isSpinning) return;

    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];

      if (sortType === "asc") {
        setSortType("desc");
        return newOptions.sort((a, b) => b.option.localeCompare(a.option));
      } else if (sortType === "desc") {
        setSortType("asc");
        return newOptions.sort((a, b) => a.option.localeCompare(b.option));
      } else {
        setSortType("asc");
        return newOptions.sort((a, b) => a.option.localeCompare(b.option));
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError(null);

    setNewOption(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSpinning) return;

    if (!newOption || newOption.trim() === "") {
      setFormError("Please enter an option");
      return;
    }

    if (newOption.length > 18) {
      setFormError("Option must be less than 18 characters");
      return;
    }

    if (options.some((option) => option.option === newOption)) {
      setFormError("Option already exists");
      return;
    }

    setOptions([
      ...options,
      {
        id: uuidv4(),
        option: newOption,
      },
    ]);

    setNewOption("");
  };

  const handleSaveEditItem = (id: string) => {
    if (isSpinning) return;

    setOptions((prevOptions) => {
      return prevOptions.map((it) =>
        it.id === id ? { ...it, option: editValue } : it,
      );
    });
    setEditItem(null);
  };

  const handleDeleteItem = (id: string) => {
    if (isSpinning) return;

    setOptions((prevOptions) => {
      return prevOptions.filter((it) => it.id !== id);
    });
  };

  return (
    <div className="flex w-[250px] flex-col items-center gap-2">
      <h1 className="text-center text-2xl font-bold">Options</h1>
      <div className="flex items-center justify-center gap-2">
        <button
          className="flex items-center gap-1.5 rounded-md bg-slate-500 px-2 py-1.5 hover:bg-slate-600"
          onClick={suffleOptions}
        >
          <Shuffle /> <span>Shuffle</span>
        </button>
        <button
          className="flex items-center gap-1.5 rounded-md bg-slate-500 px-2 py-1.5 hover:bg-slate-600"
          onClick={sortOptions}
        >
          {sortType === "asc" ? <SortAsc /> : <SortDesc />} <span>Sort</span>
        </button>
      </div>
      <div className="w-full rounded-md border border-slate-600 p-2">
        <div className="flex max-h-[400px] flex-col gap-1 overflow-y-auto pr-2">
          {options.map((item) => (
            <div key={item.id} className="rounded-md bg-slate-700">
              {editItem !== item.id ? (
                <div
                  className="flex items-center justify-between gap-2 p-2"
                  onClick={() => {
                    if (isSpinning) return;

                    setEditItem(item.id);
                    setEditValue(item.option);
                  }}
                >
                  <div>{item.option}</div>
                  <button onClick={() => handleDeleteItem(item.id)}>
                    <Trash className="size-5 text-red-500" />
                  </button>
                </div>
              ) : (
                <input
                  type="text"
                  className="border-none bg-transparent p-2 outline-none"
                  autoFocus
                  onChange={(e) => setEditValue(e.target.value)}
                  value={editValue}
                  disabled={isSpinning}
                  onBlur={() => {
                    handleSaveEditItem(item.id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSaveEditItem(item.id);
                    }
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <form
        onSubmit={onSubmit}
        className="flex w-full flex-col justify-center gap-2"
      >
        <input
          type="text"
          onChange={handleChange}
          value={newOption}
          className="w-full rounded-md border border-gray-300 bg-transparent p-2"
          placeholder="New entry"
          disabled={isSpinning}
        />
        {formError && (
          <p className="text-pretty text-sm text-red-500">{formError}</p>
        )}
      </form>
    </div>
  );
};
