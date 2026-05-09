import { FaBook, FaClock, FaMobile, FaCalendarAlt, FaUserCheck } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { Heading3, Body, Caption } from "@/components/ui/Typography";
import { IProfileUser } from "../types";

const ProfileStats = ({ singleUser }: { singleUser: IProfileUser }) => {
  const { courseTimes = [], deviceLogin = [], paymentStatus, createdAt } = singleUser;
  const stats = [
    { icon: FaBook, label: "Total Courses", value: courseTimes.length, bgColor: "bg-blue-50", iconColor: "text-blue-600" },
    { icon: FaClock, label: "Ongoing", value: courseTimes.filter((c) => c.status === "ONGOING").length, bgColor: "bg-green-50", iconColor: "text-green-600" },
    { icon: FaUserCheck, label: "Completed", value: courseTimes.filter((c) => c.status === "ENDED").length, bgColor: "bg-purple-50", iconColor: "text-purple-600" },
    { icon: FaMobile, label: "Devices", value: deviceLogin.length, bgColor: "bg-orange-50", iconColor: "text-orange-600" },
  ];
  return (
    <div className="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-3 sm:mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100"><FaCalendarAlt className="text-indigo-600" /></div>
        <div>
          <Heading3 className="text-base font-bold text-gray-900 sm:text-lg">Profile Statistics</Heading3>
          <Body className="text-xs text-gray-600 sm:text-sm">{createdAt ? `Member since ${new Date(createdAt).getFullYear()}` : "Account overview"}</Body>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`${stat.bgColor} rounded-lg p-3 text-center sm:p-4`}>
            <div className="mb-2 flex justify-center"><stat.icon className={stat.iconColor} /></div>
            <div className="text-lg font-bold text-gray-900 sm:text-2xl">{stat.value}</div>
            <Caption className="text-xs text-gray-600">{stat.label}</Caption>
          </div>
        ))}
      </div>
      {paymentStatus && (
        <div className="mt-3 flex items-center justify-center gap-2 border-t border-indigo-200 pt-3 sm:mt-4 sm:pt-4">
          <MdPayment className="text-sm text-gray-500" />
          <Caption className="text-xs text-gray-600 sm:text-sm">Payment Status:</Caption>
          <span className={`rounded-full px-2 py-1 text-xs font-medium ${paymentStatus === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{paymentStatus === "paid" ? "Paid" : "Pending"}</span>
        </div>
      )}
    </div>
  );
};

export default ProfileStats;
