import { useEffect } from 'react';
import { useState } from 'react';
import { useAppContext } from '~/context';

const QuizForm = ({ widgetData }: { widgetData: any }) => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [selectedOption, setSelectedOption] = useState('');
  const [isSave, setIsaved] = useState(false);
  const { dispatch } = useAppContext();

  const handleOptionChange = (index: number, value: any) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const enteredOptions = options?.map((option) => option?.trim()?.length > 0);
    if (title?.length > 0 && selectedOption && enteredOptions?.length >= 4) {
      setIsaved(true);
      const dispatchData = {
        ...widgetData,
        props: { title, imageUrl, selectedOption, options },
      };
      dispatch({ type: 'UPDATE_FORM_DATA', value: dispatchData });
      alert('Form submitted!');
    } else {
      alert('Problem with form saving');
    }
  };

  const renderAnswer = () => {
    if (selectedOption === widgetData?.props?.selectedOption)
      return <span className='text-green-300'>{`Correct Answer`}</span>;
    else return <span className='text-red-300'>{`Wrong Answer`}</span>;
  };
  useEffect(() => {
    if (Object.keys(widgetData?.props || {})?.length > 0) {
      setTitle(widgetData?.props?.title);
      setImageUrl(widgetData?.props?.imageUrl);
      setOptions([...widgetData?.props?.options]);
      setSelectedOption('');
    }
  }, []);

  return (
    <div className='mt-2 p-5 bg-[#F4F6FF] rounded-lg shadow-md mx-2'>
      <div className='space-y-4'>
        {/* Title */}
        <div>
          <label
            className='block text-gray-700 font-medium mb-1 text-[14px]'
            htmlFor='title'
          >
            Title
          </label>
          <textarea
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={3}
            className='w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d1160] placeholder:text-[14px]'
            placeholder='Enter your title here'
            disabled={
              Object?.keys(widgetData?.props || {})?.length > 0 &&
              title?.length > 0
            }
          />
        </div>

        {/* Image URL */}
        <div>
          <label
            className='block text-gray-700 font-medium mb-1 text-[14px]'
            htmlFor='image'
          >
            Image URL
          </label>
          <input
            type='url'
            id='image'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className='w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d1160] placeholder:text-[14px]'
            placeholder='Enter image URL'
            disabled={Object?.keys(widgetData?.props || {})?.length > 0}
          />
        </div>

        {/* Options */}
        <div>
          <label className='block text-gray-700 font-medium mb-1 text-[14px]'>
            Options
          </label>
          {options.map((option, index) => (
            <div key={index} className='flex items-center mb-1'>
              <input
                type='radio'
                name='option'
                value={option}
                onChange={(e) => setSelectedOption(e.target.value)}
                className='mr-2'
                disabled={
                  (Object?.keys(widgetData?.props || {})?.length > 0 &&
                  selectedOption?.length > 0
                    ? true
                    : !option) || isSave
                } // Only allow selection if the option has a value
              />
              <input
                type='text'
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                disabled={Object?.keys(widgetData?.props || {})?.length > 0}
                className='w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d1160] placeholder:text-[14px]'
              />
            </div>
          ))}
        </div>

        {widgetData?.props &&
          Object?.keys(widgetData?.props || {})?.length > 0 &&
          selectedOption?.length > 0 &&
          renderAnswer()}
        {/* Submit */}
        {!widgetData?.props &&
          Object?.keys(widgetData?.props || {})?.length <= 0 && (
            <button
              type='button'
              className='w-full bg-[#1d1160] text-white py-1 text-[14px] rounded-md hover:bg-[#312286] transition'
              disabled={isSave || selectedOption?.length <= 0}
              onClick={handleSubmit}
            >
              Save
            </button>
          )}
      </div>
    </div>
  );
};

export default QuizForm;
