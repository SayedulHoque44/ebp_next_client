import React, { useEffect } from "react";
import { Drawer, Typography, Card } from "antd";
import {
  HomeOutlined,
  FileTextOutlined,
  YoutubeOutlined,
  StarOutlined,
  AppstoreOutlined,
  DashboardOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { AiOutlineClose } from "react-icons/ai";
import UserPropile from "@/components/shared/UserProfile";
import useAuth from "@/features/Auth/hooks/useAuth";
import { errorToast, successToast } from "@/utils/toast";

const { Text } = Typography;

const AntMobileNav = ({
  navItems,
  isOpen,
  onClose,
}: {
  navItems: any;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { logout, user } = useAuth();
  const router = useRouter();
  // Handle body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out of your account.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        logout();
        successToast("Logged out successfully!");
        router.push("/");
        onClose();
      }
    } catch (error) {
      console.error("Logout error:", error);
      errorToast({ error: error });
    }
  };

  // Handle menu item click
  const handleMenuItemClick = (item: any) => {
    if (item.title === "Logout") {
      handleLogout();
    } else {
      router.push(item.link);
      onClose();
    }
  };

  // Get icon component based on title
  const getIconComponent = (title: string) => {
    const iconMap = {
      Home: <HomeOutlined />,
      Blogs: <FileTextOutlined />,
      "Free Video": <YoutubeOutlined />,
      Success: <StarOutlined />,
      "EBP App": <AppstoreOutlined />,
      "Latest App": <AppstoreOutlined />,
      Dashboard: <DashboardOutlined />,
      Logout: <LogoutOutlined />,
    };
    return iconMap[title as keyof typeof iconMap] || <HomeOutlined />;
  };

  // Get item color based on title
  const getItemColor = (title: string) => {
    const colorMap = {
      Home: "#1890ff",
      Blogs: "#52c41a",
      "Free Video": "#fa541c",
      Success: "#faad14",
      "EBP App": "#722ed1",
      "Latest App": "#eb2f96",
      Dashboard: "#13c2c2",
      Logout: "#ff4d4f",
    };
    return colorMap[title as keyof typeof colorMap] || "#1890ff";
  };

  return (
    <Drawer
      title={null}
      placement="right"
      onClose={onClose}
      open={isOpen}
      width={340}
      styles={{
        body: { padding: 0 },
        header: { display: "none" },
      }}
      style={{ zIndex: 1000 }}
      closable={false}
    >
      <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Clean Header */}
        <div className="p-4 bg-white dark:bg-gray-800/95 border-b border-gray-100 dark:border-gray-700/50 backdrop-blur-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between w-full">
              {/* Profile Section */}
              <div className="flex items-center gap-3">
                {user ? (
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => {
                      router.push(`/propile/${user?._id}`);
                      onClose();
                    }}
                  >
                    <UserPropile logout={false} />
                    <div>
                      <h5 className="text-sm font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">
                        {user?.name || "User"}
                      </h5>
                      <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">{user?.phone}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-P-Black dark:text-white transition-colors duration-300">
                    <h5 className="text-lg font-semibold">
                      Easy Bangla Patente
                    </h5>
                  </div>
                )}
              </div>

              {/* Close Button */}
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 text-white transition-colors duration-200 shadow-sm dark:shadow-red-900/30"
                >
                  <AiOutlineClose className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Login Button for Non-logged Users */}
          {!user && (
            <div className="mb-4">
              <button
                onClick={() => {
                  router.push("/login");
                  onClose();
                }}
                className="w-full bg-primary-500 dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-sm dark:shadow-primary-900/30 hover:shadow-md dark:hover:shadow-primary-900/50"
              >
                Login to Your Account
              </button>
            </div>
          )}

          <div className="space-y-2">
            {navItems.map((item: any, index: number) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 rounded-xl shadow-sm dark:shadow-gray-800/50 hover:shadow-md dark:hover:shadow-gray-700/50 transition-all duration-300 cursor-pointer"
              >
                <Card
                  hoverable
                  onClick={() => handleMenuItemClick(item)}
                  className="border-0 shadow-none bg-transparent dark:bg-transparent"
                  styles={{
                    body: { padding: "16px" },
                  }}
                >
                <div className="flex items-center space-x-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg"
                    style={{
                      background: `linear-gradient(135deg, ${getItemColor(
                        item.title
                      )} 0%, ${getItemColor(item.title)}CC 100%)`,
                      boxShadow: `0 4px 12px ${getItemColor(item.title)}40`,
                    }}
                  >
                    {getIconComponent(item.title)}
                  </div>
                  <div className="flex-1">
                    <Text
                      strong
                      className={item.title === "Logout" ? "text-red-500 dark:text-red-400" : "text-gray-800 dark:text-gray-100"}
                      style={{
                        fontSize: "16px",
                        display: "block",
                        marginBottom: "2px",
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      type="secondary"
                      className={item.title === "Logout" ? "text-red-400 dark:text-red-500" : "text-gray-600 dark:text-gray-400"}
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      {item.title === "Logout"
                        ? "Sign out of your account"
                        : `Navigate to ${item.title.toLowerCase()}`}
                    </Text>
                  </div>
                  <div className="text-gray-300 dark:text-gray-500 transition-colors duration-300">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Clean Footer */}
        <div className="p-6 bg-white dark:bg-gray-800/95 border-t border-gray-100 dark:border-gray-700/50 backdrop-blur-sm transition-colors duration-300">
          <div className="text-center">
            <Text
              type="secondary"
              className="text-gray-600 dark:text-gray-400"
              style={{ fontSize: "11px" }}
            >
              © 2024 EBP - Easy Bangla Patente
            </Text>
            <br />
            <Text
              type="secondary"
              className="text-gray-500 dark:text-gray-500"
              style={{ fontSize: "10px" }}
            >
              All rights reserved
            </Text>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default AntMobileNav;
