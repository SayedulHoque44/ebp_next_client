"use client";
import React, { useEffect, useState, memo } from "react";
import { AiFillSetting } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Warning from "@/components/shared/Alert/Warning";
import SystemManagementHooks from "@/features/System/hooks/system.hooks";
import { ISystem } from "@/features/System/interface/system.interface";
import { QUERY_KEY } from "@/constants/constendData";
import SingleSystem from "./SingleSystem";



const SystemManagment = memo(() => {
  const { data, isLoading } = SystemManagementHooks.useGetAllSystems({
    queryKey: [QUERY_KEY.SYSTEMS],
  });
console.log(data);
  const allSystems: ISystem[] = data?.data || [];

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        {isLoading ? (
          <div className="flex items-center gap-4 w-full">
            <Skeleton circle width={48} height={48} />
            <div className="flex-1">
              <Skeleton width={250} height={28} className="mb-2" />
              <Skeleton width={300} height={20} />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="p-3 bg-P-primary/10 rounded-full text-P-primary">
              <AiFillSetting size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                System Management
              </h1>
              <p className="text-gray-500 text-sm">
                Manage system settings and configurations
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        {isLoading ? (
          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            <div className="w-full lg:w-1/4">
              <Skeleton height={400} className="rounded-2xl" />
            </div>
            <div className="w-full lg:w-3/4">
              <Skeleton height={600} className="rounded-2xl" />
            </div>
          </div>
        ) : allSystems.length > 0 ? (
          <System allSystems={allSystems} isLoading={isLoading} />
        ) : (
          <Warning title="System Not Found" info="Try Again Later" />
        )}
      </div>
    </div>
  );
});

SystemManagment.displayName = "SystemManagment";

interface SystemProps {
  allSystems: ISystem[];
  isLoading: boolean;
}

const System = ({ allSystems, isLoading }: SystemProps) => {
  const [selectedTab, setSelectedTab] = useState<string>("");

  const effectiveSelectedTab =
    selectedTab || (allSystems[0]?.category as string | undefined) || "";

  if (!isLoading && allSystems.length > 0) {
    const selectedSystem =
      allSystems.find((system) => system.category === effectiveSelectedTab) ||
      allSystems[0];

    return (
      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-8">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-gray-800 text-lg">System Types</h3>
              <p className="text-xs text-gray-500 mt-1">
                Select a system to manage
              </p>
            </div>
            <div className="p-3 flex flex-col gap-2">
              {allSystems.map((system) => {
                const isSelected = effectiveSelectedTab === system.category;
                return (
                  <button
                    key={system._id}
                    onClick={() => setSelectedTab(system.category)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between group ${
                      isSelected
                        ? "bg-P-primary text-white shadow-md shadow-blue-200"
                        : "text-gray-600 hover:bg-gray-50 hover:text-P-primary"
                    }`}
                  >
                    <span className="font-medium truncate">
                      {system.category}
                    </span>
                    {isSelected && (
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full lg:w-3/4 min-w-0">
          {selectedSystem ? (
            <div className="animate-fadeIn">
              <SingleSystem systemId={selectedSystem._id} />
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <AiFillSetting size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                No System Selected
              </h3>
              <p className="text-gray-500 mt-2">
                Please select a system type from the sidebar to view details.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return <Warning title="System Tabs Not Found" info="Try Again Later" />;
};

export default SystemManagment;

