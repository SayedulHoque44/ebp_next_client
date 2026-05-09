import { CiUser } from "react-icons/ci";
import { MdOutlineEditNote, MdOutlineLocalPhone, MdOutlineLocationOn, MdPayments } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { FaUsers, FaCalendarAlt } from "react-icons/fa";
import StatusBadge from "../components/StatusBadge";
import ProfileStats from "./ProfileStats";
import ProfileQuickActions from "./ProfileQuickActions";
import { formatMemberSince } from "../utils";
import { IProfileUser } from "../types";

const ProfileInfoDisplay = ({ singleUser, onEditClick }: { singleUser: IProfileUser; onEditClick: () => void }) => {
  const { email = "", paymantNote = "", name, phone, city, status, note = "", group, createdAt } = singleUser;
  return (
    <div className="space-y-4 sm:space-y-6">
      <ProfileStats singleUser={singleUser} />
      <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
        <h3 className="mb-3 text-base font-semibold text-gray-900 sm:mb-4 sm:text-lg">Personal Information</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          <Info label="Full Name" icon={<CiUser />} value={name} />
          <Info label="Email Address" icon={<AiOutlineMail />} value={email} />
          <Info label="Phone Number" icon={<MdOutlineLocalPhone />} value={phone} />
          <Info label="City" icon={<MdOutlineLocationOn />} value={city} />
        </div>
      </div>
      {(group || note || paymantNote) && (
        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
          <h3 className="mb-3 text-base font-semibold text-gray-900 sm:mb-4 sm:text-lg">Additional Information</h3>
          <div className="space-y-3 sm:space-y-4">
            {group && <Info label="Group" icon={<FaUsers />} value={group} />}
            {note && <Info label="Note" icon={<MdOutlineEditNote />} value={note} />}
            {paymantNote && <Info label="Payment Note" icon={<MdPayments />} value={paymantNote} />}
          </div>
        </div>
      )}
      {createdAt && (
        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
          <Info label="Member Since" icon={<FaCalendarAlt />} value={formatMemberSince(createdAt)} />
          <div className="mt-3"><StatusBadge status={status}>{status}</StatusBadge></div>
        </div>
      )}
      <ProfileQuickActions singleUser={singleUser} onEditClick={onEditClick} />
    </div>
  );
};

const Info = ({ label, icon, value }: { label: string; icon: React.ReactNode; value?: string }) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2 text-xs font-medium text-gray-600 sm:text-sm">
      <span className="text-sm text-gray-500">{icon}</span>
      {label}
    </div>
    <p className="text-sm font-semibold text-gray-900 sm:text-base">{value || "Not provided"}</p>
  </div>
);

export default ProfileInfoDisplay;
