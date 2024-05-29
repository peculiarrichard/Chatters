import * as Yup from "yup";

export const accountSettingsValidationSchema = Yup.object().shape({
  topicsOfInterest: Yup.array().min(
    3,
    "Please select at least 3 topics of interest"
  ),
  website: Yup.string().url("Please enter a valid URL"),
  bio: Yup.string().max(200, "Bio must not exceed 200 characters"),
});
