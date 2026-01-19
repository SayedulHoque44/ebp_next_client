import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import usePContext from "../../../../Util/Hooks/usePContext";
import { paidGurdRoute } from "../../../../Util/utils";

const PartCoverBox = ({ partInfo }) => {
  const { description, title, _id } = partInfo;
  const { loggedUser, loading } = usePContext();

  const handlePaidCheck = () => {
    paidGurdRoute(`/dashboard/courseVideo/${_id}`, loggedUser);
  };
  // const handlePaidCheck = () => {

  //   if (loggedUser?.role === "Admin") {
  //     return (window.location.href = `/dashboard/courseVideo/${_id}`);
  //   }
  //   if (
  //     loggedUser?.status === "Active" &&
  //     loggedUser?.paymentStatus === "paid"
  //   ) {
  //     return (window.location.href = `/dashboard/courseVideo/${_id}`);
  //   } else if (loggedUser?.status === "Active") {
  //     toast.error("কিছু সম্যসা হয়েছে !");
  //   } else if (loggedUser?.paymentStatus === "paid") {
  //     toast.error("কিছুক্ষন পরে চেষ্টা করুন ।");
  //   } else {
  //     toast.error("আপনাকে কোর্সটা কিনতে হবে।");
  //   }
  // };
  return (
    <span
      onClick={handlePaidCheck}
      className=" block cursor-pointer mx-auto max-w-sm p-6 bg-[##1f2937] border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
      <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-P-primary rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-P-primary  dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        দেখুন
        <svg
          className="w-3.5 h-3.5 ml-2"
          // aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </span>
    </span>
  );
};

export default PartCoverBox;
