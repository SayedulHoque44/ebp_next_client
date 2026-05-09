import { useCallback, useMemo, useState } from "react";
import { FaRegEdit, FaSave, FaTimes } from "react-icons/fa";
import useAuth from "@/features/Auth/hooks/useAuth";
import UserHooks from "@/features/User/hooks/user.hooks";
import toast from "react-hot-toast";
import { useProfileForm } from "../hooks";
import { useQueryClient } from "@tanstack/react-query";
import { BasicInfoForm, AdminFields, PinResetForm, PaymentStatusForm } from "./components";
import Button from "@/components/ui/Button";
import { IProfileUser } from "../types";

interface Props {
  singleUser: IProfileUser;
  editOpen: boolean;
  setEditOpen: (value: boolean) => void;
}

const ModernUpdateUser = ({ singleUser, editOpen, setEditOpen }: Props) => {
  const { _id, paymentStatus, status } = singleUser;
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const updateUserQuery = UserHooks.useUpdateSingleUserMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["single-user", _id] });
      await queryClient.invalidateQueries({ queryKey: ["all-users"] });
    },
  });
  const [selectPayment, setSelectPayment] = useState(paymentStatus);
  const [selectStatus, setSelectStatus] = useState(status);
  const { user: loggedUser } = useAuth();
  const form = useProfileForm(singleUser, editOpen);

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload: Record<string, any> = { ...form.userDataObj };
      if (selectPayment !== paymentStatus) payload.paymentStatus = selectPayment;
      if (selectStatus !== status) payload.status = selectStatus;
      const result = await updateUserQuery.mutateAsync({ userId: _id, data: payload });
      toast.success(result?.message || "User updated successfully");
      setEditOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  const autocompleteMap = useMemo(
    () => ({
      name: "name",
      email: "email",
      phone: "tel",
      city: "address-level2",
      group: "organization",
      paymantNote: "off",
      note: "off",
      currentPin: "current-password",
      newPin: "new-password",
    }),
    []
  );

  const handlePayment = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setSelectPayment(e.target.value), []);
  const handleStatus = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setSelectStatus(e.target.value), []);

  if (!editOpen) return null;

  return (
    <div className="rounded-2xl border border-primary-200 bg-gradient-to-r from-primary-50 to-blue-50 p-4 sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex items-center justify-center rounded-xl bg-primary-500 p-2 sm:p-3"><FaRegEdit className="text-white" /></div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Edit Profile Information</h3>
          <p className="text-sm text-gray-600">Update your personal details and preferences</p>
        </div>
      </div>

      <form onSubmit={handleUpdateUser} className="space-y-8">
        <BasicInfoForm formData={form.formData} errorObj={form.errorObj} handleName={form.handleName} handleEmail={form.handleEmail} handlePhone={form.handlePhone} handleCity={form.handleCity} handleGroup={form.handleGroup} autocompleteMap={autocompleteMap} />
        {loggedUser?.role === "Admin" && <AdminFields formData={form.formData} handlePaymantNote={form.handlePaymantNote} handleNote={form.handleNote} autocompleteMap={autocompleteMap} />}
        <PinResetForm currentPin={form.currentPin} newPin={form.newPin} matchedPin={form.matchedPin} handleCurrentPin={form.handleCurrentPin} handleNewPin={form.handleNewPin} errorObj={form.errorObj} autocompleteMap={autocompleteMap} />
        <PaymentStatusForm singleUser={singleUser} selectPayment={selectPayment} selectStatus={selectStatus} handlePayment={handlePayment} handleStatus={handleStatus} />

        <div className="flex gap-4 border-t border-primary-200 pt-4 sm:pt-8">
          <Button type="button" onClick={() => setEditOpen(false)} variant="outline" className="cursor-pointer" leftIcon={<FaTimes />}>Cancel</Button>
          <Button
            type="submit"
            loading={loading}
            className="cursor-pointer"
            disabled={(form.userObjKeysExits(form.userDataObj) && selectPayment === paymentStatus && selectStatus === status) || Object.keys(form.errorObj).length > 0 || loading}
            leftIcon={!loading ? <FaSave /> : null}
          >
            {loading ? "Saving Changes..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ModernUpdateUser;
