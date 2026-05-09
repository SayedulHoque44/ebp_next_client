import { ComponentType, ReactNode } from "react";
import { FaCog, FaEdit, FaTimes } from "react-icons/fa";

interface ProfileSectionProps {
  title: string;
  isEditable?: boolean;
  isEditing?: boolean;
  onEditToggle?: () => void;
  children: ReactNode;
  className?: string;
  icon?: ComponentType<{ className?: string }>;
}

const ProfileSection = ({
  title,
  isEditable = false,
  isEditing = false,
  onEditToggle,
  children,
  className = "",
  icon: Icon = FaCog,
}: ProfileSectionProps) => {
  return (
    <section
      className={`overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl ${className}`}
    >
      <div className="border-b border-gray-200 bg-linear-to-r from-gray-50 to-gray-100 px-4 py-4 sm:px-8 sm:py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 sm:h-10 sm:w-10 sm:rounded-xl">
              <Icon className="text-sm text-primary-600 sm:text-lg" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 sm:text-xl">{title}</h2>
              <p className="text-xs text-gray-500 sm:text-sm">
                Manage your profile information
              </p>
            </div>
          </div>

          {isEditable && onEditToggle && (
            <button
              type="button"
              onClick={onEditToggle}
              aria-label={isEditing ? "Cancel editing" : "Edit profile"}
              className={`group flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition-all duration-200 hover:scale-105 sm:rounded-xl sm:px-6 sm:py-3 sm:text-base ${
                isEditing
                  ? "bg-red-500 text-white shadow-red-200 hover:bg-red-600"
                  : "border border-primary-200 bg-white text-primary-600 hover:border-primary-300 hover:bg-primary-50"
              }`}
            >
              {isEditing ? (
                <>
                  <FaTimes className="text-sm transition-transform duration-200 group-hover:rotate-90" />
                  <span className="hidden sm:inline">Cancel</span>
                </>
              ) : (
                <>
                  <FaEdit className="text-sm transition-transform duration-200 group-hover:scale-110" />
                  <span className="hidden sm:inline">Edit Profile</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="p-2 sm:p-8">{children}</div>
    </section>
  );
};

export default ProfileSection;
