import { CiUser } from "react-icons/ci";
import FormField from "./FormField";

interface Props {
  currentPin: string;
  newPin: string;
  matchedPin: boolean;
  handleCurrentPin: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNewPin: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorObj: Record<string, string>;
  autocompleteMap: Record<string, string>;
}

const PinResetForm = ({ currentPin, newPin, matchedPin, handleCurrentPin, handleNewPin, errorObj, autocompleteMap }: Props) => (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold text-gray-900">PIN Reset</h3>
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <FormField icon={CiUser} label="Current PIN" name="currentPin" value={currentPin} onChange={handleCurrentPin} placeholder="Enter current PIN" type="password" autocompleteMap={autocompleteMap} />
      <FormField icon={CiUser} label="New PIN" name="newPin" value={newPin} onChange={handleNewPin} error={errorObj?.pin} placeholder="Enter new PIN" type="password" disabled={!matchedPin} autocompleteMap={autocompleteMap} />
    </div>
  </div>
);

export default PinResetForm;
