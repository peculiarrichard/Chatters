import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { openNotification } from "@/components/commons/Toasts";
import { signupValidationSchema } from "@/validations/auth/signup-validation";
import { SignUpInterface } from "@/models/props/auth/SignUpModel";
import { handleValidationError } from "@/utils/general/handleValidationErrors";

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
    handleValidationError(err, setFormErrors, setErrorMsg);
    console.error(err);
  } finally {
    setLoading(false);
  }
};
