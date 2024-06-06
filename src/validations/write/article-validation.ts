import * as Yup from "yup";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const FILE_SIZE = 5 * 1024 * 1024;

export const articleValidationSchema = Yup.object().shape({
  title: Yup.string().required("Please enter title"),
  body: Yup.string().required("Please enter body"),
  excerpt: Yup.string()
    .required("Please enter excerpt")
    .max(500, "Excerpt must not exceed 300 characters"),
  topicsOfInterest: Yup.array().min(
    3,
    "Please select at least 3 topics of interest"
  ),
  featuredImage: Yup.mixed()
    .required("Please upload featured image")
    .test("fileSize", "File size is too large", (value) => {
      if (!value) return false;
      const file = value as File;
      return file.size <= FILE_SIZE;
    })
    .test("fileFormat", "Unsupported Format", (value) => {
      if (!value) return false;
      const file = value as File;
      return SUPPORTED_FORMATS.includes(file.type);
    }),
});
