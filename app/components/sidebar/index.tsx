import React from "react";
import { SidebarConfig } from "../../utils/sidebarData";

const Sidebar = ({ handleDrag }:{handleDrag :(e:any, item:any)=> void}) => {
  return (
    <div className="text-balck bg-slate-50 h-[100vh]">
      {SidebarConfig?.map((item) => {
        return (
          <div
            className="flex flex-col p-8 gap-2 cursor-pointer hover:bg-slate-200"
            draggable
            onDragStart={(e) => handleDrag(e, item)}
          >
            <h1 className="text-[20px] font-semibold">{item?.name}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
