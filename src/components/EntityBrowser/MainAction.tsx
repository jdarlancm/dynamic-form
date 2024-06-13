import React from "react";
import { IconType } from "react-icons";

import HiddenActionsPopup from "./HiddenActionsPopup";

interface MainActionsProps {
  actions: MainAction[];
}

export type MainAction = {
  icon: IconType;
  label: string;
  onClick: () => void;
  className: string;
};

const MainActions: React.FC<MainActionsProps> = ({ actions }) => {
  const mainActions = actions.slice(0, 2);

  return (
    <div className="flex space-x-2">
      <div className="hidden sm:flex space-x-2">
        {mainActions.map((action, index) => (
          <button
            key={index}
            className={`flex items-center text-xs px-3 py-1 rounded ${action.className}`}
            onClick={action.onClick}
          >
            <action.icon className="text-md" />
            <span className="ml-1">{action.label}</span>
          </button>
        ))}
      </div>

      {actions.length > 0 && <HiddenActionsPopup actions={actions} />}
    </div>
  );
};

export default MainActions;
