import * as yup from "yup";

export const AuthInitialState = {
  email: "",
  username: "",
  password: "",
};

export const RegisterInitialState = {
  ...AuthInitialState,
  confirmPassword: "",
};

export const AuthSchema = (hasConfirmPassword = false) => {
  const baseSchema = {
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    username: yup.string().required("Username is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  };

  if (hasConfirmPassword) {
    return yup
      .object({
        ...baseSchema,
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("password"), ""], "Passwords must match")
          .required("Confirm password is required"),
      })
      .required();
  }

  return yup.object(baseSchema).required();
};

export const ProfileSchema = yup.object().shape({
  defaultImage: yup.string().required("Image is required"),
  defaultGender: yup
    .object()
    .shape({
      label: yup.string().required("required"),
      value: yup.string().required("required"),
    })
    .nullable(),
  name: yup
    .string()
    .required("Name is required")
    .max(50, "Name cannot exceed 50 characters"),
  birthday: yup
    .string()
    .required("Birthday is required")
    .typeError("Invalid date format"),
  height: yup
    .number()
    .required("Height is required")
    .min(50, "Height must be at least 50 cm")
    .max(300, "Height cannot exceed 300 cm")
    .typeError("Height must be a number"),
  weight: yup
    .number()
    .required("Weight is required")
    .min(20, "Weight must be at least 20 kg")
    .max(500, "Weight cannot exceed 500 kg")
    .typeError("Weight must be a number"),
  horoscope: yup
    .string()
    .required("Horoscope is required")
    .matches(/^[a-zA-Z\s]*$/, "Horoscope must only contain letters"),
  zodiac: yup
    .string()
    .required("Zodiac is required")
    .matches(/^[a-zA-Z\s]*$/, "Zodiac must only contain letters"),
  interest: yup.array(),
});
