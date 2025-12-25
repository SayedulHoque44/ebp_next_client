"use client";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";
import useAuth from "@/features/auth/hooks/useAuth";
import Image from "next/image";
import { mediaProvider } from "@/lib/constants/mediaProvider";
const UserPropile = ({ logout = true }: { logout?: boolean }) => {
  const { user, clearUser } = useAuth();

  // console.log(SingleUser);
  return (
    <div className="flex items-center gap-4">
      <Link
        href={`/propile/${user?._id}`}
        className="h-12 w-12 rounded-full overflow-hidden  border-2 border-P-gry cursor-pointer relative"
      >
        <Image
          src={user?.photoURL || mediaProvider.userImg}
          alt=""
          className="w-full "
          width={48}
          height={48}
        />
      </Link>
      {logout && (
        <FiLogOut
          className="cursor-pointer hover:text-red-600"
          onClick={clearUser}
          size={25}
        />
      )}
    </div>
  );
};

export default UserPropile;
