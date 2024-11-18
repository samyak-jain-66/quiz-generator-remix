import React, { useEffect } from 'react';
import { useState } from 'react';

const Progress = ({
  widgetData,
  percent,
}: {
  widgetData?: any;
  percent: number;
}) => {
  const [percentage, setPercentage] = useState(percent);

  useEffect(() => {
    console.log('inside progress');
    setPercentage(percent);
  }, [percent]);

  return (
    <div>
      <div className='w-full bg-gray-200 rounded-full h-2 overflow-hidden'>
        <div
          className='h-full bg-[#1d1160] transition-all duration-300 ease-in-out'
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Progress;
