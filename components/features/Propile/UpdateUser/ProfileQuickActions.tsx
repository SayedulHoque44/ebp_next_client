import {
  FaEdit,
  FaShare,
  FaBell,
  FaFileExcel,
  FaCopy,
  FaCog,
  FaFileCsv,
} from "react-icons/fa";
import { MdOutlineLocalPhone, MdOutlineEmail } from "react-icons/md";
import { HiCodeBracket } from "react-icons/hi2";
import useAuth from "@/features/Auth/hooks/useAuth";
import { useProfileActions } from "../hooks";
import { IProfileUser } from "../types";
import GenericModal from "@/components/shared/GenericModal";

const ProfileQuickActions = ({
  singleUser,
  onEditClick,
}: {
  singleUser: IProfileUser;
  onEditClick: () => void;
}) => {
  const { email, phone, name } = singleUser;
  const { user: loggedUser } = useAuth();
  const isAdmin = loggedUser?.role === "Admin";
  const {
    showExportModal,
    setShowExportModal,
    handleShareProfile,
    handleExportData,
    handleExportCSV,
    handleExportJSON,
    handleCopyContact,
  } = useProfileActions(singleUser, loggedUser || undefined);

  const actions = [
    {
      icon: FaEdit,
      label: "Edit Profile",
      description: "Update your information",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      hoverColor: "hover:bg-blue-100",
      onClick: onEditClick,
      show: true,
    },
    {
      icon: FaShare,
      label: "Share Profile",
      description: "Share profile link",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      hoverColor: "hover:bg-purple-100",
      onClick: handleShareProfile,
      show: true,
    },
    {
      icon: FaFileExcel,
      label: "Export Data",
      description: "Download user data (Admin only)",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      hoverColor: "hover:bg-green-100",
      onClick: handleExportData,
      show: isAdmin,
    },
  ].filter((a) => a.show);

  const contactActions = [
    {
      icon: MdOutlineEmail,
      label: "Send Email",
      value: email,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      onClick: () => email && window.open(`mailto:${email}`, "_blank"),
      onCopy: () => handleCopyContact("Email", email),
    },
    {
      icon: MdOutlineLocalPhone,
      label: "Call",
      value: phone,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      onClick: () => phone && window.open(`tel:${phone}`, "_blank"),
      onCopy: () => handleCopyContact("Phone", phone),
    },
  ].filter((action) => action.value);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
        <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-gray-900 sm:mb-4 sm:text-lg">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 sm:h-8 sm:w-8">
            <FaCog className="text-sm text-indigo-600 sm:text-base" />
          </div>
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {actions.map((action, index) => (
            <button
              key={index}
              type="button"
              onClick={action.onClick}
              className={`${action.bgColor} ${action.hoverColor} group min-h-[60px] cursor-pointer rounded-lg p-3 text-left transition-all duration-200 hover:scale-105 sm:min-h-[80px] sm:p-4`}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm transition-shadow duration-200 group-hover:shadow-md sm:h-10 sm:w-10">
                  <action.icon
                    className={`${action.iconColor} text-sm sm:text-lg`}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 sm:text-base">
                    {action.label}
                  </h4>
                  <p className="text-xs leading-tight text-gray-600 group-hover:text-gray-500 sm:text-sm">
                    {action.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {contactActions.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
          <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-gray-900 sm:mb-4 sm:text-lg">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-green-100 sm:h-8 sm:w-8">
              <FaBell className="text-sm text-green-600 sm:text-base" />
            </div>
            Contact {name}
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {contactActions.map((action, index) => (
              <div
                key={index}
                className={`${action.bgColor} group rounded-lg p-3 transition-all duration-200 hover:scale-105 sm:p-4`}
              >
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={action.onClick}
                    className="flex min-h-[60px] flex-1 cursor-pointer items-center gap-2 text-left sm:min-h-[80px] sm:gap-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm transition-shadow duration-200 group-hover:shadow-md sm:h-10 sm:w-10">
                      <action.icon
                        className={`${action.iconColor} text-sm sm:text-lg`}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 sm:text-base">
                        {action.label}
                      </h4>
                      <p className="break-all text-xs leading-tight text-gray-600 group-hover:text-gray-500 sm:text-sm">
                        {action.value}
                      </p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={action.onCopy}
                    className="ml-2 flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center p-2 text-gray-400 transition-colors duration-200 hover:text-gray-600"
                    title={`Copy ${action.label.toLowerCase()}`}
                  >
                    <FaCopy className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <GenericModal
        open={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Data"
        width="500px"
        headerStyle={{
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        }}
        actions={[
          {
            key: "cancel",
            label: "Cancel",
            variant: "secondary",
            onClick: () => setShowExportModal(false),
          },
        ]}
      >
        <div className="space-y-3 p-4 sm:space-y-4 sm:p-6">
          <p className="text-sm text-gray-700 sm:text-base">
            Choose the format for exporting user data:
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex min-h-[44px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-600 sm:px-6 sm:text-base"
            >
              <FaFileCsv />
              Export as CSV
            </button>
            <button
              type="button"
              onClick={handleExportJSON}
              className="flex min-h-[44px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-purple-500 px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-purple-600 sm:px-6 sm:text-base"
            >
              <HiCodeBracket />
              Export as JSON
            </button>
          </div>
        </div>
      </GenericModal>
    </div>
  );
};

export default ProfileQuickActions;
