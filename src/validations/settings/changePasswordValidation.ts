import * as Yup from "yup";

export const changePasswordValidation = Yup.object().shape({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string()
    .required("New Password is required")
    .min(8, "New Password must be at least 8 characters")
    .max(20, "New Password must not exceed 20 characters")
    .matches(
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\W_])/,
      "New Password must contain at least one number, one letter, and one special character, and be at least 8 characters long"
    )
    .notOneOf(
      [Yup.ref("oldPassword"), null],
      "New Password must be different from Old Password"
    ),
});
