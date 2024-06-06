import * as Yup from "yup";

export const handleValidationError = (
  err: any,
  setFormErrors: (errors: { [key: string]: string }) => void,
  setErrorMsg: (msg: string) => void
) => {
  if (err.name === "ValidationError") {
    const validationErrors: { [key: string]: string } = {};
    (err.inner as Array<Yup.ValidationError>).forEach((e) => {
      if (e.path) {
        validationErrors[e.path] = e.errors[0];
      }
    });
    setFormErrors(validationErrors);
  } else {
    setErrorMsg(err.message || "Something went wrong. Please try again.");
  }
};
