"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import LoaderCircleWithBar from "@/components/shared/LoaderCircleWithBar";
import Container from "@/components/ui/Container";
import useAuth from "@/features/Auth/hooks/useAuth";
import UserHooks from "@/features/User/hooks/user.hooks";
import ModernDeviceShow from "./DeviceShow/ModernDeviceShow";
import ModernUpdateDuration from "./UpdateDuration/ModernUpdateDuration";
import ModernUpdateUser from "./UpdateUser/ModernUpdateUser";
import ProfileInfoDisplay from "./UpdateUser/ProfileInfoDisplay";
import ProfileCard from "./components/ProfileCard";
import ProfileSection from "./components/ProfileSection";
import Button from "@/components/ui/Button";
import { Heading1, Heading2, Body, Caption } from "@/components/ui/Typography";
import { IProfileUser } from "./types";

const Propile = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Array.isArray(id) ? id[0] : id;
  const { user: loggedUser, clearUser } = useAuth();
  const [editOpen, setEditOpen] = useState(false);

  const { data: singleUserResponse, isLoading } =
    UserHooks.useGetSingleUserQuery({
      queryKey: ["single-user", userId || ""],
      params: { userId: userId || "" },
      options: { enabled: !!userId },
    });

  const singleUser = singleUserResponse?.data as IProfileUser | undefined;
  const userMongoId = singleUser?._id;

  if (isLoading) {
    return (
      <Container>
        <div className="flex min-h-screen items-center justify-center">
          <LoaderCircleWithBar />
        </div>
      </Container>
    );
  }

  if (!singleUser || !userId) {
    return (
      <Container>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <Heading2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
              User Not Found!
            </Heading2>
            <Body className="text-gray-600">
              The user you are looking for does not exist.
            </Body>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <Heading1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Profile Dashboard
                </Heading1>
                <Body className="mt-1 text-sm text-gray-600 sm:text-base">
                  Manage your account and preferences
                </Body>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <div className="text-center sm:text-right">
                  <Caption className="text-xs text-gray-500 sm:text-sm">
                    Welcome back,
                  </Caption>
                  <Body className="text-sm font-semibold text-gray-900 sm:text-base">
                    {singleUser.name}
                  </Body>
                </div>
                <Button
                  variant="outline"
                  onClick={clearUser}
                  className="w-full cursor-pointer sm:w-auto"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 xl:grid-cols-4">
            <div className="order-1 xl:col-span-1">
              <ProfileCard
                user={singleUser}
                isAdmin={loggedUser?.role === "Admin"}
                className="sticky top-4 sm:top-8"
              />
            </div>
            <div className="order-2 space-y-6 sm:space-y-8 xl:col-span-3">
              <ProfileSection
                title="Profile Information"
                isEditable
                isEditing={editOpen}
                onEditToggle={() => setEditOpen(!editOpen)}
              >
                {editOpen ? (
                  <ModernUpdateUser
                    singleUser={singleUser}
                    editOpen={editOpen}
                    setEditOpen={setEditOpen}
                  />
                ) : (
                  <ProfileInfoDisplay
                    singleUser={singleUser}
                    onEditClick={() => setEditOpen(true)}
                  />
                )}
              </ProfileSection>

              {singleUser.role !== "Admin" && (
                <ProfileSection title="Course Duration">
                  <ModernUpdateDuration singleUser={singleUser} />
                </ProfileSection>
              )}

              {!!singleUser?.deviceLogin?.length &&
                loggedUser?.role === "Admin" && (
                  <ProfileSection title="Device Activity">
                    <ModernDeviceShow
                      userAllDevice={singleUser.deviceLogin}
                      userId={userMongoId}
                    />
                  </ProfileSection>
                )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Propile;
