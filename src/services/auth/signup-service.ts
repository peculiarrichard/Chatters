import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { openNotification } from "@/components/commons/Toasts";
import * as Yup from "yup";
import { signupValidationSchema } from "@/validations/auth/signup-validation";
import { SignUpInterface } from "@/models/auth/SignUpModel";

export const signUpService = async (
  values: SignUpInterface,
  setLoading: (value: boolean) => void,
  setErrorMsg: (msg: string) => void,
  router: AppRouterInstance,
  setFormErrors: (errors: { [key: string]: string }) => void
) => {
  try {
    await signupValidationSchema.validate(values, {
      abortEarly: false,
    });

    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (res.ok) {
      openNotification("Success", data.message, "success");
      router.push("/");
    } else {
      setErrorMsg(data.message);
    }
    return data;
  } catch (err: any) {
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
    console.error(err);
  } finally {
    setLoading(false);
  }
};
