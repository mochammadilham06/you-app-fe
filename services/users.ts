import { axiosInstance } from "@youapp/configs/axiosInstance";

const UserService = () => {
  type UserRequestType = {
    name: string;
    birthday: string;
    height: number;
    weight: number;
    interests: string[];
  };

  const createProfile = async (props: UserRequestType) => {
    try {
      const res = await axiosInstance.post("/createProfile", props);
      // const res = {
      //   data: {
      //     message: "Profile has been created successfully",
      //     data: {
      //       email: "storm2@mail.com",
      //       username: "storm123",
      //       interests: [],
      //     },
      //   },
      // };
      console.log({ res });
      return res.data;
    } catch (error) {
      console.log({ error });
      return Promise.reject(error);
    }
  };

  const getProfile = async () => {
    try {
      const res = await axiosInstance.get("/getProfile");
      // const res = {
      //   data: {
      //     message: "Profile has been found successfully",
      //     data: {
      //       email: "storm2@mail.com",
      //       username: "storm123",
      //       name: "storm",
      //       birthday: "12-10-2000",
      //       horoscope: "Sagittarius",
      //       zodiac: "Dragon",
      //       height: 167,
      //       weight: 60,
      //       interests: [""],
      //     },
      //   },
      // };
      console.log({ res });

      return res?.data;
    } catch (error) {
      console.log({ error });
      return Promise.reject(error);
    }
  };

  const updateProfile = async (props: UserRequestType) => {
    try {
      const res = await axiosInstance.put("/updateProfile", props);
      // const res = {
      //   data: {
      //     message: "Profile has been updated successfully",
      //     data: {
      //       email: "storm2@mail.com",
      //       username: "storm123",
      //       name: "storm",
      //       birthday: "12-10-2000",
      //       horoscope: "Sagittarius",
      //       zodiac: "Dragon",
      //       height: 167,
      //       weight: 60,
      //       interests: [""],
      //     },
      //   },
      // };
      return res?.data;
    } catch (error) {
      console.log({ error });
      return Promise.reject(error);
    }
  };
  return {
    createProfile,
    getProfile,
    updateProfile,
  };
};

export default UserService;
