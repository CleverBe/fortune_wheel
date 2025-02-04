import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useOptionsContext } from "../hooks/useOptionsContext";
import { newOptionIsValid } from "../validation/newOption";

export const NewEntryForm = () => {
  const { isSpinning, saveOption } = useOptionsContext();

  const [newOption, setNewOption] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleChangeNewOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError(null);

    setNewOption(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSpinning) return;

    const inputError = newOptionIsValid(newOption);

    if (inputError) {
      setFormError(inputError);
      return;
    }

    saveOption(newOption);

    setNewOption("");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full flex-col justify-center gap-2"
    >
      <div className="relative w-full">
        <input
          type="text"
          onChange={handleChangeNewOption}
          value={newOption}
          className="w-full rounded-md border border-gray-300 bg-transparent p-2 pr-11"
          placeholder="New entry"
          disabled={isSpinning}
        />
        <button
          type="submit"
          className="absolute right-0.5 top-1/2 -translate-y-1/2 rounded-md p-2 hover:bg-slate-600"
        >
          <ArrowRight />
        </button>
      </div>
      {formError && <p className="text-sm text-red-500">{formError}</p>}
    </form>
  );
};
