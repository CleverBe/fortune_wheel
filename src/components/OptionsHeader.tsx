import { useOptionsContext } from "../hooks/useOptionsContext";
import { Shuffle, SortAsc, SortDesc } from "lucide-react";
import { SortTypeEnum } from "../context/OptionsContext";

export const OptionsHeader = () => {
  const { suffleOptions, sortOptions, sortType } = useOptionsContext();

  return (
    <div className="flex items-center justify-center gap-2 text-sm">
      <button
        className="flex items-center gap-1 rounded-md bg-slate-500 px-1.5 py-1 hover:bg-slate-600"
        onClick={suffleOptions}
      >
        <Shuffle className="size-4" /> <span>Shuffle</span>
      </button>
      <button
        className="flex items-center gap-1 rounded-md bg-slate-500 px-1.5 py-1 hover:bg-slate-600"
        onClick={sortOptions}
      >
        {sortType === SortTypeEnum.DESC ? (
          <SortDesc className="size-4" />
        ) : (
          <SortAsc className="size-4" />
        )}{" "}
        <span>Sort</span>
      </button>
    </div>
  );
};
