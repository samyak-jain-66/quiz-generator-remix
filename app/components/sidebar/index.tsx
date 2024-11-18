import React from 'react';
import { SidebarConfig } from '../../utils/sidebarData';

const Sidebar = ({
  handleDrag,
}: {
  handleDrag: (e: any, item: any) => void;
}) => {
  return (
    <div className='text-black bg-[#F4F6FF] h-[100vh] flex flex-col gap-5 px-3 py-5'>
      {SidebarConfig?.map((item) => {
        return (
          <div
            className='flex items-center p-8 gap-2 cursor-pointer hover:bg-[#1d1160] transition-all  hover:text-white border-[1px] border-[lightgray] rounded-md h-[40px] '
            draggable
            onDragStart={(e) => handleDrag(e, item)}
          >
            <h1 className='text-[16px] font-semibold'>{item?.name}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
