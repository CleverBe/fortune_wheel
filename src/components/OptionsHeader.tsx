import { useState } from "react";
import { useOptionsContext } from "../hooks/useOptionsContext";
import { Shuffle, SortAsc, SortDesc } from "lucide-react";

export const OptionsHeader = () => {
  const { suffleOptions, sortOptions, isSpinning } = useOptionsContext();

  const [sortType, setSortType] = useState<"asc" | "desc" | null>(null);

  const onClickSort = () => {
    if (isSpinning) return;

    if (sortType === "asc") {
      setSortType("desc");
      sortOptions({ sortType: "desc" });
    } else {
      setSortType("asc");
      sortOptions({ sortType: "asc" });
    }
  };

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
        onClick={onClickSort}
      >
        {sortType === "desc" ? (
          <SortDesc className="size-4" />
        ) : (
          <SortAsc className="size-4" />
        )}{" "}
        <span>Sort</span>
      </button>
    </div>
  );
};
