import { axiosInstance } from "@youapp/configs/axiosInstance";

const AuthService = () => {
  type AuthRequest = {
    email: string;
    username: string;
    password: string;
  };
  const login = async (props: AuthRequest) => {
    try {
      const res = await axiosInstance.post("/login", props);
      // const res = {
      //   data: {
      //     message: "User has been logged in successfully",
      //     access_token:
      //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjNkMmY3YzRhYTZkMjEwMGVjNTdiNyIsInVzZXJuYW1lIjoic3Rvcm0xMjMiLCJlbWFpbCI6InN0b3JtMkBtYWlsLmNvbSIsImlhdCI6MTczNDY2NDkzNiwiZXhwIjoxNzM0NjY4NTM2fQ.sJKcX_O97PsXOKu2mgYttt7oV4Lf-Sj7FF_zdvrAuFY",
      //   },
      // };
      console.log({ res });

      return res?.data;
    } catch (error) {
      console.log({ error });
      return Promise.reject(error);
    }
  };

  const register = async (props: AuthRequest) => {
    try {
      const res = await axiosInstance.post("/register", props);
      console.log({ res });
      return res?.data;
    } catch (error) {
      console.log({ error });
      return Promise.reject(error);
    }
  };

  return {
    login,
    register,
  };
};

export default AuthService;
