import type { ChangeEvent } from 'react';

const Select = ({
  value,
  onChange,
  options,
  label,
  isDisabled
}: {
  value: string | number;
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string | number; name: string }[];
  label: string;
  isDisabled?: boolean;
}) => {
  return (
    <div className='flex flex-col items-start gap-1'>
      <label className='ml-1 text-xs text-gray-300'>{label}</label>
      <select
        disabled={isDisabled}
        className='min-w-50 cursor-pointer rounded bg-gray-700 p-2 transition-all duration-200 ease-linear hover:bg-gray-800 active:border-0 active:ring-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-700 sm:min-w-full'
        id={label}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
