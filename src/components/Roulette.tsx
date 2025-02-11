import { Wheel } from "react-custom-roulette";
import { useRef, useState } from "react";
import { Modal } from "./Modal";
import toast from "react-hot-toast";
import { Option } from "../types";
import { backgroundColors } from "../constants";
import { useOptionsContext } from "../hooks/useOptionsContext";

export const Roulette = () => {
  const { options, deleteOption, canSpin, isSpinning, setIsSpinning } =
    useOptionsContext();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const mappedOptions = options.map((option) => {
    return {
      id: option.id,
      option: option.title,
    };
  });

  const getWinner = (id: number): Option | undefined => {
    return options[id];
  };

  const winner = getWinner(prizeNumber);

  const handleSpinClick = () => {
    if (options.length <= 1) {
      toast.error("You must have at least 2 options");

      return;
    }

    if (!canSpin) {
      toast.error("You have an invalid option");

      return;
    }

    if (!isSpinning) {
      const newPrizeNumber = Math.floor(Math.random() * options.length);

      setPrizeNumber(newPrizeNumber);
      setIsSpinning(true);
    }
  };

  const onOpen = () => {
    dialogRef.current?.showModal();
  };

  const onClose = () => {
    dialogRef.current?.close();
  };

  const onRemove = (id: string) => {
    const option = options.find((option) => option.id === id);

    if (!option) return;

    deleteOption(option.id);

    toast(`Removed ${option.title}`);

    onClose();
  };

  return (
    <div className="relative size-[220px] select-none sm:size-[300px] md:size-[500px] [&>div]:h-full [&>div]:max-h-none [&>div]:w-full [&>div]:max-w-none">
      {options.length > 0 ? (
        <>
          <Wheel
            mustStartSpinning={isSpinning}
            spinDuration={0.4}
            disableInitialAnimation
            prizeNumber={prizeNumber}
            data={mappedOptions}
            onStopSpinning={() => {
              setIsSpinning(false);
              onOpen();
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
        <div className="flex h-full w-full items-center justify-center rounded-full border-8 border-[#ccc] bg-slate-800 text-4xl">
          There are no options
        </div>
      )}
      {winner && (
        <Modal
          ref={dialogRef}
          winner={winner}
          onClose={onClose}
          onRemove={onRemove}
        />
      )}
    </div>
  );
};
