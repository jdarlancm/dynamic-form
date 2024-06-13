import React from "react";

import HiddenActionsPopup from "./HiddenActionsPopup";
import { MainAction } from "./EntityBrowser.types";

interface MainActionsProps {
  actions: MainAction[];
}

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
