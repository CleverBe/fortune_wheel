import { useContext } from "react";
import { OptionContext } from "../context/OptionsContext";

export const useOptionsContext = () => {
  const context = useContext(OptionContext);

  if (!context) {
    throw new Error(
      "useOptionsContext must be used inside the OptionsProvider",
    );
  }

  return context;
};
