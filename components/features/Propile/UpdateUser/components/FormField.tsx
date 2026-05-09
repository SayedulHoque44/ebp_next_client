import { IconType } from "react-icons";

interface FormFieldProps {
  icon: IconType;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  autocompleteMap?: Record<string, string>;
}

const FormField = ({ icon: Icon, label, name, value, onChange, error, placeholder, type = "text", disabled = false, autocompleteMap = {} }: FormFieldProps) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100"><Icon className="text-sm text-primary-600" /></div>
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      autoComplete={autocompleteMap[name] || "off"}
      className={`w-full rounded-xl border-2 px-4 py-3 ${error ? "border-red-300 bg-red-50" : "border-gray-200"} ${disabled ? "cursor-not-allowed bg-gray-50 text-gray-500" : "bg-white"}`}
    />
    {error && <p className="text-xs font-medium text-red-500">{error}</p>}
  </div>
);

export default FormField;
