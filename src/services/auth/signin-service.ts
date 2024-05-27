import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { SigninInterface } from "@/models/auth/SigninModel";
import { signinValidationSchema } from "@/validations/auth/signin-validation";
import { openNotification } from "@/components/commons/Toasts";
import * as Yup from "yup";

export const signinService = async (
  values: SigninInterface,
  router: AppRouterInstance,
  setErrorMsg: (msg: string) => void,
  setLoading: (value: boolean) => void,
  setFormErrors: (errors: { [key: string]: string }) => void
) => {
  try {
    await signinValidationSchema.validate(values, {
      abortEarly: false,
    });
    setLoading(true);
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (res.ok) {
      openNotification("Success", data.message, "success");
      if (typeof window !== "undefined") {
        localStorage.setItem("chattersUser", JSON.stringify(data.user));
      }
      router.push("/dashboard");
    } else {
      setErrorMsg(data.message);
    }
    return data;
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const validationErrors: { [key: string]: string } = {};
      (error.inner as Array<Yup.ValidationError>).forEach((e) => {
        if (e.path) {
          validationErrors[e.path] = e.errors[0];
        }
      });
      setFormErrors(validationErrors);
    } else {
      setErrorMsg(error.message || "Something went wrong. Please try again.");
    }
    console.error(error);
  } finally {
    setLoading(false);
  }
};
