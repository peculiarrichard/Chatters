
import * as Yup from "yup";

export const onboardValidationSchema = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  mainActivity: Yup.string().required("Please select one activity"),
  topicsOfInterest: Yup.array()
    .min(3, "Please select at least 3 topics of interest")
    .required("Topics of interest are required"),
});
