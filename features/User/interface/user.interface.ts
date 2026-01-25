export interface IUser {
  _id: string;
  name: string;
  phone: string;
  city: string;
  pin: number;
  email: string;
  propileImageUrl: string;
  paymentStatus: "paid" | "unPaid" | string;
  status: "Active" | "Inactive" | string;
  role: string;
  group: string;
  photoURL: string;
  paymantNote: string;
  deviceLogin: any[]; // you can specify a more detailed type if known
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  courseTimes: IUserCourse[];
  __v: number;
  logInAttempt: number;
  isDeleted: boolean;
  note: string;
}

export interface IUserResponse {
  success: boolean;
  data: IUser;
  message: string;
}

export interface IUserGetAllUsersResponse {
  success: boolean;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    result: IUser[];
  };
  message: string;
}

export interface IUserGetAllUsersRequest {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sort?: string;
  status?: "Active" | "Inactive" | string;
  role?: string;
  group?: string;
  paymentStatus?: "paid" | "unPaid" | string;
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
  note?: string;
  deviceLogin?: any[];
}

export interface IUserGetMeRequest {
  deviceInfo: string;
}

export interface IUserCourse {
  _id: string;
  userId: string;
  startDate: string;
  endDate: string;
  durationInMonths: number;
  status: string;
}

export interface IUserCourseTimesRequest {
  courseId: string;
  userId: string;
  startDate: string;
  endDate: string;
  durationInMonths: number;
}

export interface IUserCourseTimesResponse {
  success: boolean;
  data: IUserCourse[];
  message: string;
}
