import StatusBadge from "../../components/StatusBadge";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  options: RadioOption[];
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroup = ({ label, options, selectedValue, onChange }: RadioGroupProps) => (
  <div className="space-y-4">
    <label className="block text-sm font-semibold text-gray-700">{label}</label>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {options.map((option) => (
        <label key={option.value} className="cursor-pointer">
          <input type="radio" value={option.value} checked={selectedValue === option.value} onChange={onChange} className="sr-only" />
          <div className={`rounded-xl border-2 p-4 text-center ${selectedValue === option.value ? "border-primary-500 bg-primary-50" : "border-gray-200"}`}>
            <StatusBadge type={option.value}>{option.label}</StatusBadge>
          </div>
        </label>
      ))}
    </div>
  </div>
);

export default RadioGroup;
