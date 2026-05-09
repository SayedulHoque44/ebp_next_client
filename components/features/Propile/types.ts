import { IUser, IUserCourse } from "@/features/User/interface/user.interface";
import { ReactNode } from "react";

export interface IDeviceLogin {
  _id?: string;
  deviceInfo: string;
  userIp?: string;
  systemId?: string;
  isDeleted?: boolean;
  createdAt: string;
}

export interface IProfileUser extends IUser {
  deviceLogin: IDeviceLogin[];
  courseTimes: IUserCourse[];
}

export interface IStatusBadgeProps {
  type?: string;
  status?: string;
  className?: string;
  children?: ReactNode;
}
