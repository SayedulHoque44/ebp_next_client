import { IUser } from "@/features/User/interface/user.interface";

export interface ILoginRequest {
  phone: string;
  pin: number;
  deviceInfo: string;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: IUser;
  };
}

export interface IAuthStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
  clearUser: () => void;
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  clearAccessToken: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
}
