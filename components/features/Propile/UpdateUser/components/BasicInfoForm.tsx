import { CiUser } from "react-icons/ci";
import { MdOutlineLocalPhone, MdOutlineLocationOn } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import FormField from "./FormField";
import useAuth from "@/features/Auth/hooks/useAuth";

interface Props {
  formData: Record<string, string>;
  errorObj: Record<string, string>;
  handleName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhone: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCity: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGroup: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autocompleteMap: Record<string, string>;
}

const BasicInfoForm = ({ formData, errorObj, handleName, handleEmail, handlePhone, handleCity, handleGroup, autocompleteMap }: Props) => {
  const { user: loggedUser } = useAuth();
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <FormField icon={CiUser} label="Full Name" name="name" value={formData.name || ""} onChange={handleName} error={errorObj?.name} placeholder="Update your name" autocompleteMap={autocompleteMap} />
      <FormField icon={AiOutlineMail} label="Email" name="email" value={formData.email || ""} onChange={handleEmail} error={errorObj?.email} placeholder="Update your email" autocompleteMap={autocompleteMap} />
      <FormField icon={MdOutlineLocalPhone} label="Phone" name="phone" value={formData.phone || ""} onChange={handlePhone} error={errorObj?.phone} placeholder="Update your phone" disabled={loggedUser?.role !== "Admin"} autocompleteMap={autocompleteMap} />
      <FormField icon={MdOutlineLocationOn} label="City" name="city" value={formData.city || ""} onChange={handleCity} error={errorObj?.city} placeholder="Update your city" autocompleteMap={autocompleteMap} />
      <FormField icon={MdOutlineLocationOn} label="Group" name="group" value={formData.group || ""} onChange={handleGroup} error={errorObj?.group} placeholder="Update your group" disabled={loggedUser?.role !== "Admin"} autocompleteMap={autocompleteMap} />
    </div>
  );
};

export default BasicInfoForm;
