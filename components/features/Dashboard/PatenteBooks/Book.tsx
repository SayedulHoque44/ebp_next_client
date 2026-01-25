"use client";
import React, { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import useAuth from "@/features/Auth/hooks/useAuth";
import UserHooks from "@/features/User/hooks/user.hooks";
import { QUERY_KEY } from "@/constants/constendData";
import { IUser } from "@/features/User/interface/user.interface";

interface BookProps {
  book: {
    title: string;
    description?: string;
    _id?: string;
    coverImage: string;
    route?: string;
  };
  href?: string;
}

const Book = ({ book, href }: BookProps) => {
  const { title, description, _id, coverImage, route } = book;
  const { user } = useAuth();
  const router = useRouter();

  // Get single user data
  const {
    data: singleUserData,
    isLoading: isSingleUserLoading,
    error: singleUserError,
  } = UserHooks.useGetSingleUserQuery({
    queryKey: [QUERY_KEY.SINGLE_USER, user?._id || ""],
    params: { userId: user?._id || "" },
    options: {
      enabled: !!user?._id,
    },
  });

  const SingleUser = useMemo<IUser | null>(
    () => singleUserData?.data || null,
    [singleUserData?.data]
  );

  const handlePaidCheck = useCallback(() => {
    // Check if user is admin
    if (user?.role === "Admin") {
      if (href) {
        window.location.href = href;
        return;
      }
      router.push(`/dashboard/patenteBooks/${_id || route}`);
      return;
    }

    // Wait for user data to load
    if (isSingleUserLoading) {
      return;
    }

    // Handle error case
    if (singleUserError || !SingleUser) {
      toast.error("কিছু সম্যসা হয়েছে !");
      return;
    }

    // Check if user already passed
    if (SingleUser.status === "Passed") {
      toast.error("You are already passed!");
      return;
    }

    // Check user active and paid status
    if (
      SingleUser?.status === "Active" &&
      SingleUser?.paymentStatus === "paid"
    ) {
      if (href) {
        window.location.href = href;
        return;
      }
      router.push(`/dashboard/patenteBooks/${_id || route}`);
    } else if (SingleUser?.status === "Active") {
      toast.error("কিছু সম্যসা হয়েছে !");
    } else if (SingleUser?.paymentStatus === "paid") {
      toast.error(
        "আপনার কোর্স টাইম শেষ হয়ে গিয়েছে, টাইম বাডানোর জন্য যোগাযোগ করুন।"
      );
    } else {
      toast.error("আপনাকে কোর্সটা কিনতে হবে।");
    }
  }, [
    user?.role,
    href,
    _id,
    route,
    router,
    isSingleUserLoading,
    singleUserError,
    SingleUser,
  ]);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handlePaidCheck}
      className="group h-full flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300"
    >
      <div className="relative overflow-hidden h-[280px] bg-gray-50">
        <img
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          src={coverImage}
          alt={title}
        />
      </div>

      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <h5 className="mb-3 text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-P-primary transition-colors">
            {title}
          </h5>

          {description && (
            <p className="mb-4 text-gray-500 text-sm line-clamp-3 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-50">
          <button className="w-full inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-P-primary to-purple-600 rounded-xl hover:from-purple-600 hover:to-P-primary transition-all duration-300 shadow-md shadow-purple-200 group-hover:shadow-lg group-hover:shadow-purple-300">
            Read Book
            <svg
              className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Book;
