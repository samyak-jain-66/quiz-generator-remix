import { useState, useEffect } from 'react';

const Timer = ({
  widgetData,
  timer = 60,
  handleNextQuestion,
}: {
  widgetData: any;
  timer?: number;
  handleNextQuestion?: () => void;
}) => {
  const [time, setTime] = useState(timer);

  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup on unmount
    } else {
      if (handleNextQuestion) {
        setTime(timer);
        handleNextQuestion();
      }
    }
  }, [time]);

  useEffect(() => {
    console.log('inside timer');
  }, [timer]);

  return (
    <div className='flex justify-end items-center p-4'>
      <div className='text-xl font-bold text-[#1d1160]'>
        {time > 0 ? `${time}s` : "Time's Up!"}
      </div>
    </div>
  );
};

export default Timer;
