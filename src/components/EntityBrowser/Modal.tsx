import React from "react";
import { colors } from "./colors";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 w-screen h-screen">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div
        className={`relative ${colors.background.light} dark:${colors.background.dark} rounded shadow-lg z-10 w-[95vw] max-h-[95vh] overflow-y-auto"`}
      >
        <button className="absolute top-0 right-0 p-2" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
