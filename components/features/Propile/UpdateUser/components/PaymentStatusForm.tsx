import StatusBadge from "../../components/StatusBadge";
import RadioGroup from "./RadioGroup";
import useAuth from "@/features/Auth/hooks/useAuth";
import { IProfileUser } from "../../types";

interface Props {
  singleUser: IProfileUser;
  selectPayment: string;
  selectStatus: string;
  handlePayment: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleStatus: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentStatusForm = ({ singleUser, selectPayment, selectStatus, handlePayment, handleStatus }: Props) => {
  const { user: loggedUser } = useAuth();
  if (singleUser.role === "Admin") return null;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Payment & Status</h3>
      {loggedUser?.role === "Admin" ? (
        <div className="space-y-6">
          <RadioGroup label="Payment Status" options={[{ value: "paid", label: "Paid" }, { value: "unPaid", label: "Unpaid" }]} selectedValue={selectPayment} onChange={handlePayment} />
          <RadioGroup label="Account Status" options={[{ value: "Active", label: "Active" }, { value: "Passed", label: "Passed" }, { value: "Disabled", label: "Disabled" }, { value: "Block", label: "Block" }]} selectedValue={selectStatus} onChange={handleStatus} />
        </div>
      ) : (
        <div className="flex gap-3">
          <StatusBadge type={singleUser.paymentStatus}>{singleUser.paymentStatus}</StatusBadge>
          <StatusBadge type={singleUser.status}>{singleUser.status}</StatusBadge>
        </div>
      )}
    </div>
  );
};

export default PaymentStatusForm;
