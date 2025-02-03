import { Wheel } from "react-custom-roulette";
import { Option } from "../App";
import { useState } from "react";

const backgroundColors = [
  "#3f297e",
  "#175fa9",
  "#169ed8",
  "#239b63",
  "#64b031",
  "#efe61f",
  "#f7a416",
  "#e6471d",
  "#dc0936",
  "#e5177b",
  "#be1180",
  "#871f7f",
];

interface RouletteProps {
  options: Option[];
  mustSpin: boolean;
  setMustSpin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Roulette = ({ options, mustSpin, setMustSpin }: RouletteProps) => {
  const [prizeNumber, setPrizeNumber] = useState(0);
  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * options.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  return (
    <div className="roulette-container relative size-[220px] select-none sm:size-[300px] md:size-[500px]">
      {options.length > 0 ? (
        <>
          <Wheel
            mustStartSpinning={mustSpin}
            spinDuration={0.5}
            disableInitialAnimation
            prizeNumber={prizeNumber}
            data={options}
            onStopSpinning={() => {
              setMustSpin(false);
              console.log("winner is", options[prizeNumber]);
            }}
            radiusLineColor="transparent"
            textColors={["#fff"]}
            backgroundColors={backgroundColors}
            outerBorderColor={"#ccc"}
            outerBorderWidth={9}
          />
          <button
            className="absolute left-1/2 top-1/2 z-10 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white p-2 text-xs text-black sm:size-14 sm:text-sm md:size-16 md:text-base"
            onClick={handleSpinClick}
          >
            SPIN
          </button>
        </>
      ) : (
        <div className="flex items-center justify-center">No Options</div>
      )}
    </div>
  );
};
