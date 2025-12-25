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
  paymantNote: string;
  deviceLogin: any[]; // you can specify a more detailed type if known
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
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

export interface IUserGetMeRequest {
  deviceInfo: string;
}
