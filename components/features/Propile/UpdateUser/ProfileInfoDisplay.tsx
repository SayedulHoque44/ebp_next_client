import { CiUser } from "react-icons/ci";
import {
  MdOutlineEditNote,
  MdOutlineLocalPhone,
  MdOutlineLocationOn,
  MdPayments,
} from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { FaUser, FaUsers, FaCalendarAlt } from "react-icons/fa";
import StatusBadge from "../components/StatusBadge";
import ProfileStats from "./ProfileStats";
import ProfileQuickActions from "./ProfileQuickActions";
import { formatMemberSince } from "../utils";
import { IProfileUser } from "../types";

const ProfileInfoDisplay = ({
  singleUser,
  onEditClick,
}: {
  singleUser: IProfileUser;
  onEditClick: () => void;
}) => {
  const {
    email = "",
    paymantNote = "",
    name,
    phone,
    city,
    status,
    note = "",
    group,
    createdAt,
  } = singleUser;
  return (
    <div className="space-y-4 sm:space-y-6">
      <ProfileStats singleUser={singleUser} />
      <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <FaUser className="text-blue-600 text-sm sm:text-base" />
          </div>
          Personal Information
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          <Info label="Full Name" icon={<CiUser />} value={name} />
          <Info label="Email Address" icon={<AiOutlineMail />} value={email} />
          <Info
            label="Phone Number"
            icon={<MdOutlineLocalPhone />}
            value={phone}
          />
          <Info label="City" icon={<MdOutlineLocationOn />} value={city} />
        </div>
      </div>
      {(group || note || paymantNote) && (
        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <MdOutlineEditNote className="text-purple-600 text-sm sm:text-base" />
            </div>
            Additional Information
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {group && <Info label="Group" icon={<FaUsers />} value={group} />}
            {note && (
              <Info label="Note" icon={<MdOutlineEditNote />} value={note} />
            )}
            {paymantNote && (
              <Info
                label="Payment Note"
                icon={<MdPayments />}
                value={paymantNote}
              />
            )}
          </div>
        </div>
      )}
      {createdAt && (
        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <FaCalendarAlt className="text-orange-600 text-sm sm:text-base" />
            </div>
            Account Details
          </h3>
          <Info
            label="Member Since"
            icon={<FaCalendarAlt />}
            value={formatMemberSince(createdAt)}
          />
        </div>
      )}
      <ProfileQuickActions singleUser={singleUser} onEditClick={onEditClick} />
    </div>
  );
};

const Info = ({
  label,
  icon,
  value,
}: {
  label: string;
  icon: React.ReactNode;
  value?: string;
}) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2 text-xs font-medium text-gray-600 sm:text-sm">
      <span className="text-sm text-gray-500">{icon}</span>
      {label}
    </div>
    <p className="text-sm font-semibold text-gray-900 sm:text-base">
      {value || "Not provided"}
    </p>
  </div>
);

export default ProfileInfoDisplay;
