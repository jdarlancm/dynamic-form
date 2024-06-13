import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { MainAction } from "./MainAction";

interface HiddenActionsPopupProps {
  actions: MainAction[];
}
const HiddenActionsPopup = ({ actions }: HiddenActionsPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className={`${
            actions.length <= 2 ? "sm:hidden" : ""
          } px-2 py-2 text-sm text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-800 rounded-md hover:bg-gray-400 `}
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={togglePopup}
        >
          <FaEllipsisV className="text-md" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-700 dark:bg-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {actions.map((action, index) => (
              <button
                key={index}
                className={`${
                  index <= 1 ? "sm:hidden" : ""
                } flex items-center px-4 py-2 text-sm text-gray-200 dark:text-gray-800 hover:bg-gray-600 dark:hover:bg-gray-300 w-full text-left`}
                onClick={action.onClick}
                role="menuitem"
              >
                <action.icon className="text-md" />
                <span className="ml-1">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HiddenActionsPopup;
