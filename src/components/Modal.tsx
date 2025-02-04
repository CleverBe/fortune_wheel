import { forwardRef } from "react";
import { Option } from "../types";

export interface ModalProps {
  winner: Option;
  onClose: () => void;
  onRemove: (id: string) => void;
}

export const Modal = forwardRef<HTMLDialogElement, ModalProps>((props, ref) => {
  const { winner, onClose, onRemove } = props;

  return (
    <dialog
      ref={ref}
      className="z-10 w-[300px] rounded-md bg-gray-300 backdrop:bg-gray-800/50"
    >
      <div className="flex flex-col items-center justify-center p-4">
        <div className="text-5xl">{winner.title}</div>
        <div className="mb-2 mt-8 h-1 w-full bg-gray-600" />
        <div className="flex w-full items-center justify-center gap-2">
          <button
            className="rounded-md bg-gray-500 px-4 py-2 text-white"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="rounded-md bg-blue-500 px-4 py-2 text-white"
            onClick={() => onRemove(winner.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </dialog>
  );
});
