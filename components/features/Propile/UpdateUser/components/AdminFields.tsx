import { MdPayments, MdOutlineEditNote } from "react-icons/md";
import FormField from "./FormField";

interface Props {
  formData: Record<string, string>;
  handlePaymantNote: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNote: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autocompleteMap: Record<string, string>;
}

const AdminFields = ({ formData, handlePaymantNote, handleNote, autocompleteMap }: Props) => (
  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
    <FormField icon={MdPayments} label="Payment Note" name="paymantNote" value={formData.paymantNote || ""} onChange={handlePaymantNote} placeholder="Update payment note" autocompleteMap={autocompleteMap} />
    <FormField icon={MdOutlineEditNote} label="Note" name="note" value={formData.note || ""} onChange={handleNote} placeholder="Update note" autocompleteMap={autocompleteMap} />
  </div>
);

export default AdminFields;
