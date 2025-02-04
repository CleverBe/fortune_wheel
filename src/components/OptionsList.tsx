import { Trash } from "lucide-react";
import { cn } from "../lib/utils";
import { Option } from "../types";
import { useEffect, useState } from "react";
import { newOptionIsValid } from "../validation/newOption";
import toast from "react-hot-toast";
import { useOptionsContext } from "../hooks/useOptionsContext";

export const OptionsList = () => {
  const {
    options: defaultOptions,
    setCanSpin,
    isSpinning,
    updateOption,
    deleteOption,
    editItem,
    setEditItem,
  } = useOptionsContext();

  const [editValue, setEditValue] = useState("");
  const [editError, setEditError] = useState<string | null>(null);

  const options = defaultOptions.slice().reverse();

  useEffect(() => {
    setCanSpin(editError ? false : true);
  }, [editError]);

  const onClickOption = (option: Option) => {
    if (isSpinning || editError) return;

    setEditItem(option.id);
    setEditValue(option.title);
  };

  const onEditOption = (id: string) => {
    if (isSpinning) return;

    const option = options.find((it) => it.id === id);

    if (editValue === option?.title) {
      setEditItem(null);
      return;
    }

    const inputError = newOptionIsValid(editValue);

    if (inputError) {
      toast.error(inputError);
      setEditError(inputError);
      return;
    }

    updateOption(id, editValue);

    setEditItem(null);
  };

  const onDeleteOption = (id: string) => {
    if (isSpinning) return;

    deleteOption(id);
  };

  return (
    <div className="flex max-h-[400px] min-h-32 flex-col gap-1 overflow-y-auto pr-2">
      {options.length > 0 ? (
        options.map((item) => (
          <div
            key={item.id}
            className={cn("rounded-md bg-slate-700 hover:bg-slate-600", {
              "bg-red-600": editItem === item.id && editError,
            })}
          >
            {editItem !== item.id ? (
              <div className="flex cursor-pointer items-center justify-between gap-2 p-2">
                <div
                  onClick={() => {
                    onClickOption(item);
                  }}
                  className="w-full"
                >
                  {item.title}
                </div>
                <button
                  onClick={() => onDeleteOption(item.id)}
                  className="hover:text-red-500"
                >
                  <Trash className="size-5" />
                </button>
              </div>
            ) : (
              <input
                type="text"
                className="border-none bg-transparent p-2 outline-none"
                autoFocus
                onChange={(e) => {
                  setEditError(null);
                  setEditValue(e.target.value);
                }}
                value={editValue}
                disabled={isSpinning}
                onBlur={() => {
                  onEditOption(item.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === "Escape") {
                    onEditOption(item.id);
                  }
                }}
              />
            )}
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center">
          <p className="text-sm text-gray-400">No options</p>
        </div>
      )}
    </div>
  );
};
