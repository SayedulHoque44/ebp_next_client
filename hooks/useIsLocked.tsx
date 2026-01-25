import useAuth from "@/features/Auth/hooks/useAuth";
import { useMemo } from "react";


/**
 * Custom hook to check if content is locked based on user status and payment
 * @returns {boolean} - true if content is locked, false if unlocked
 *
 * Content is unlocked if:
 * - User is Admin, OR
 * - User status is "Active" AND paymentStatus is "paid"
 *
 * Otherwise, content is locked
 */
const useIsLocked = (): boolean => {
  const {  user } = useAuth();

  const isLocked = useMemo(() => {
    // Admin always has access
    if (user?.role === "Admin") return false;

    // User must be Active AND paid to have access
    if (
      user?.status === "Active" &&
      user?.paymentStatus === "paid"
    ) {
      return false;
    }

    // Default to locked
    return true;
  }, [user]);

  return isLocked;
};

export default useIsLocked;
