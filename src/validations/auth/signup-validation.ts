import * as Yup from "yup";

export const signupValidationSchema = Yup.object().shape({
  fullName: Yup.string().required("First Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must not exceed 20 characters")
    .matches(
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\W_])/,
      "Password must contain at least one number, one letter, and one special character, and be at least 8 characters long"
    ),
});
