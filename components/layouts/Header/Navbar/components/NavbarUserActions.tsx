"use client";

import React from "react";
import useAuth from "@/features/Auth/hooks/useAuth";
import UserPropile from "@/components/shared/UserProfile";
import PLinkBtn from "@/components/shared/PLinkBtn";
import { NAVBAR_STYLES } from "../config/navbar.config";

/**
 * NavbarUserActions Component (Client Component)
 * 
 * User actions section (login button or user profile)
 * Client component for user interactions
 */
export const NavbarUserActions: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className={NAVBAR_STYLES.userActions}>
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <UserPropile logout={false} />
          </div>
        ) : (
          <PLinkBtn text="Login" link="/login" />
        )}
      </div>
    </div>
  );
};
