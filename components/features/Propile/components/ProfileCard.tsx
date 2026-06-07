import { ComponentType } from "react";
import moment from "moment-timezone";
import Image from "next/image";
import {
  MdOutlineLocationOn,
  MdOutlineEmail,
  MdOutlinePhone,
} from "react-icons/md";
import { TbCalendarTime } from "react-icons/tb";
import { FaUser, FaShieldAlt, FaCrown } from "react-icons/fa";
import { IProfileUser } from "../types";
import StatusBadge from "./StatusBadge";

interface ProfileCardProps {
  user: IProfileUser;
  isAdmin?: boolean;
  className?: string;
}

interface InfoItemProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value?: string | number;
  itemClassName?: string;
}

const InfoItem = ({
  icon: Icon,
  label,
  value,
  itemClassName = "",
}: InfoItemProps) => (
  <div
    className={`group flex items-start gap-2 rounded-lg p-2 transition-colors duration-200 hover:bg-gray-50 sm:gap-3 sm:p-3 ${itemClassName}`}
  >
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 transition-colors duration-200 group-hover:bg-primary-50 sm:h-10 sm:w-10">
      <Icon className="text-sm text-gray-600 group-hover:text-primary-600 sm:text-lg" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p className="truncate text-xs font-semibold text-gray-900 sm:text-sm">
        {value || "Not provided"}
      </p>
    </div>
  </div>
);

const ProfileCard = ({
  user,
  isAdmin = false,
  className = "",
}: ProfileCardProps) => {
  const {
    propileImageUrl,
    name,
    email,
    phone,
    city,
    group,
    status,
    paymentStatus,
    role,
    pin,
    createdAt,
  } = user;

  return (
    <aside
      className={`overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl ${className}`}
    >
      <div className="relative bg-linear-to-br from-primary-500 via-primary-600 to-primary-700 px-4 py-6 sm:px-6 sm:py-8">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative text-center">
          <div className="relative inline-block">
            <div className="h-16 w-16 overflow-hidden rounded-xl ring-3 ring-white/20 shadow-xl sm:h-20 sm:w-20 sm:rounded-2xl sm:ring-4 sm:shadow-2xl">
              {propileImageUrl ? (
                <Image
                  src={propileImageUrl}
                  alt={name || "User"}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary-100 text-xl font-bold text-primary-700">
                  {name?.slice(0, 1)?.toUpperCase() || "U"}
                </div>
              )}
            </div>
            {role !== "Admin" && (
              <div className="absolute -right-1 -top-1">
                <StatusBadge type={status} className="px-2 py-0.5 text-[10px]">
                  {status}
                </StatusBadge>
              </div>
            )}
          </div>

          <div className="mt-3 sm:mt-4">
            <h3 className="text-lg font-bold text-white sm:text-xl">{name}</h3>
            {role === "Admin" ? (
              <div className="mt-1 flex items-center justify-center gap-2 sm:mt-2">
                <FaCrown className="text-xs text-yellow-300 sm:text-sm" />
                <p className="text-xs font-medium text-yellow-100 sm:text-sm">
                  Administrator
                </p>
              </div>
            ) : (
              <p className="mt-1 text-xs text-primary-100 sm:text-sm">
                {group}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Status Badges */}
      {role !== "Admin" && (
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-100">
          <div className="flex justify-center gap-2">
            <StatusBadge type={paymentStatus}>{paymentStatus}</StatusBadge>
            <StatusBadge type={status}>{status}</StatusBadge>
          </div>
        </div>
      )}
      <div className="space-y-1 bg-gray-100 p-4 sm:p-6">
        <InfoItem icon={MdOutlineEmail} label="Email" value={email} />
        <InfoItem icon={MdOutlinePhone} label="Phone" value={phone} />
        <InfoItem icon={MdOutlineLocationOn} label="Location" value={city} />

        {isAdmin && pin && (
          <InfoItem
            icon={FaUser}
            label="Security PIN"
            value={pin}
            itemClassName="border border-[#d9c2ff] bg-[#f3eefc]"
          />
        )}

        <InfoItem
          icon={TbCalendarTime}
          label="Member Since"
          value={
            createdAt
              ? moment(createdAt).local().format("MMM D, YYYY")
              : "Not provided"
          }
        />
      </div>
    </aside>
  );
};

export default ProfileCard;
