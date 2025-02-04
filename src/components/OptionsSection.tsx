import { NewEntryForm } from "./NewEntryForm";
import { OptionsList } from "./OptionsList";
import { OptionsHeader } from "./OptionsHeader";

export const OptionsSection = () => {
  return (
    <div className="flex w-[250px] flex-col items-center gap-2 rounded-md bg-slate-800 p-2">
      <NewEntryForm />
      <div className="flex w-full flex-col gap-2 rounded-md border border-slate-600 p-2">
        <OptionsHeader />
        <OptionsList />
      </div>
    </div>
  );
};
