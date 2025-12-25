import api from "@/lib/api";
import { ILoginRequest, ILoginResponse } from "../interface/auth.interface";

const loginHandler = async (data: ILoginRequest): Promise<ILoginResponse> => {
  const res = await api.post("/users/login", data);
  console.log("res - auth.api.ts -->", res);
  return res.data;
};

// const refreshTokenHandler = async (): Promise<string | any> => {
//   try {
//     const res = await axios.post(
//       `${process.env.NEXT_PUBLIC_API_URL}/refresh-token`,
//       {},
//       { withCredentials: true }
//     );
//     if (res.status === 200) {
//       return res.data;
//     }
//     return void 0;
//   } catch (error) {
//     console.error("Failed to refresh token", error);

//     useAuthStore.getState().clearAccessToken();
//     return void 0;
//   }
// };

const AuthApi = {
  loginHandler,
  // refreshTokenHandler,
};

export default AuthApi;
