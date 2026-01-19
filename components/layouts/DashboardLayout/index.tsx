"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import useAuth from "@/features/Auth/hooks/useAuth";
import { DashboardIcon } from "@/constants/dashboardIcons";
import UserPropile from "@/components/shared/UserProfile";
import Logo from "@/components/shared/Logo";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading, accessToken } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile drawer
  const [isCollapsed, setIsCollapsed] = useState(false); // Desktop collapse
  const pathname = usePathname();

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Secure content
  useEffect(() => {
    const handleContextMenu = (e: any) => e.preventDefault();
    window.addEventListener("contextmenu", handleContextMenu);
    return () => window.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  const navItems = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: <DashboardIcon route="/dashboard" size={20} />,
      end: true,
    },
    ...(user?.role === "Admin"
      ? [
          {
            to: "/dashboard/adminManagment/userManagment",
            label: "Admin Management",
            icon: <DashboardIcon route="adminManagment" size={20} />,
            activeCheck: (path: string) => path.includes("/adminManagment"),
          },
        ]
      : []),
    {
      to: "/dashboard/simulazioneEsame",
      label: "Simulazione Esame",
      icon: <DashboardIcon route="simulazioneEsame" size={20} />,
    },
    {
      to: "/dashboard/quizPerArgument",
      label: "Quiz Per Argomenti",
      icon: <DashboardIcon route="quizPerArgument" size={20} />,
    },
    {
      to: "/dashboard/ripassoErrori",
      label: "Ripasso Errori",
      icon: <DashboardIcon route="ripassoErrori" size={20} />,
    },
    {
      to: "/dashboard/theory",
      label: "Theory Con Quiz",
      icon: <DashboardIcon route="theory" size={20} />,
    },
    {
      to: "/dashboard/cerca",
      label: "Cerca Quiz",
      icon: <DashboardIcon route="cerca" size={20} />,
    },
    {
      to: "/dashboard/PrivateVideos",
      label: "Videos",
      icon: <DashboardIcon route="PrivateVideos" size={20} />,
    },
    {
      to: "/dashboard/patenteBooks",
      label: "Books",
      icon: <DashboardIcon route="patenteBooks" size={20} />,
    },
    {
      to: "/dashboard/courseVideo",
      label: "Course Video",
      icon: <DashboardIcon route="courseVideo" size={20} />,
    },
    {
      to: "/dashboard/QNAPdf",
      label: "QNA",
      icon: <DashboardIcon route="QNAPdf" size={20} />,
    },
    {
      to: "/dashboard/quizBook",
      label: "Quiz Book",
      icon: <DashboardIcon route="quizBook" size={20} />,
    },
    {
      to: "/dashboard/trucchi",
      label: "Trucchi",
      icon: <DashboardIcon route="trucchi" size={20} />,
    },
    {
      to: "/dashboard/studentNotes",
      label: "Notes",
      icon: <DashboardIcon route="studentNotes" size={20} />,
    },
  ];

  const NavItem = ({ item, collapsed }: { item: any; collapsed: boolean }) => {
    const isActive = item.activeCheck
      ? item.activeCheck(pathname)
      : item.end
        ? pathname === item.to
        : pathname.startsWith(item.to);

    return (
      <Link
        href={item.to}
        className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative ${
          isActive
            ? "bg-P-primary text-white shadow-lg shadow-P-primary/30"
            : "text-gray-500 hover:bg-purple-50 hover:text-P-primary"
        }`}
      >
        <span className="shrink-0">{item.icon}</span>
        <span
          className={`whitespace-nowrap transition-all duration-300 ${
            collapsed ? "w-0 opacity-0 overflow-hidden" : "w-auto opacity-100"
          }`}
        >
          {item.label}
        </span>
        {/* Tooltip for collapsed mode */}
        {collapsed && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
            {item.label}
          </div>
        )}
      </Link>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-40 ${
          isCollapsed ? "w-20" : "w-72"
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-gray-100">
          <div
            className={`transition-all duration-300 ${
              isCollapsed ? "scale-0 w-0" : "scale-100 w-auto"
            }`}
          >
            {!isCollapsed && <Logo nameColor={"text-gray-800"} />}
          </div>
          {isCollapsed && (
            <div className="w-full flex justify-center">
              <span className="text-2xl font-bold text-P-primary">EB</span>
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
          >
            {isCollapsed ? (
              <RiMenuUnfoldLine size={20} />
            ) : (
              <RiMenuFoldLine size={20} />
            )}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 scrollbar-hide">
          {navItems.map((item, index) => (
            <NavItem key={index} item={item} collapsed={isCollapsed} />
          ))}
        </div>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-gray-100">
          <div
            className={`flex items-center gap-3 transition-all duration-300 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="shrink-0">
              <UserPropile />
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-gray-700 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
        <aside
          className={`absolute top-0 left-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100">
            <Logo nameColor={"text-gray-800"} />
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <IoClose size={24} className="text-gray-500" />
            </button>
          </div>
          <div className="p-4 space-y-1">
            {navItems.map((item, index) => (
              <NavItem key={index} item={item} collapsed={false} />
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
            <div className="flex items-center gap-3">
              <UserPropile />
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-lg"
          >
            <HiMenuAlt2 size={24} className="text-gray-700" />
          </button>
          <Logo nameColor={"text-gray-800"} />
          <div className="w-8" /> {/* Spacer for centering */}
        </header>

        {/* Content Scroll Area */}
        <main className="flex-1 overflow-y-auto calc(max-h-screen - 16px) md:max-h-screen md:min-h-screen bg-gray-50 p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
