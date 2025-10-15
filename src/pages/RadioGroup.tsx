interface option {
  value: string;
  label: string;
}

interface radioGroup {
  options: option[];
  name: string;
  value: string;
  onChange: (value: string) => void;
}

function RadioGroup({ options, name, onChange, value }: radioGroup) {
  return (
    <div className="flex gap-7">
      {/* Trip Type Selection */}
      {options.map((option) => {
        return (
          <div className="flex gap-2 items-center cursor-pointer text-gray-700">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange && onChange(e.target.value)}
              className="h-4 w-4 rounded-full border border-gray-400 checked:bg-blue-600 checked:border-blue-600 appearance-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="">{option.label}</label>
          </div>
        );
      })}
    </div>
  );
}

export default RadioGroup;
