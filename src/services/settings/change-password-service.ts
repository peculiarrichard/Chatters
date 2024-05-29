import { ChangePasswordInterface } from "@/models/props/settings/ChangePassword";
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { openNotification } from "@/components/commons/Toasts";
import { changePasswordValidation } from "@/validations/settings/changePasswordValidation";
import * as Yup from "yup";

export const changePasswordService = async (
  values: ChangePasswordInterface,
  router: AppRouterInstance,
  setLoading: (val: boolean) => void,
  setErrMsg: (val: string) => void,
  setFormErrors: (errors: { [key: string]: string }) => void
) => {
  try {
    await changePasswordValidation.validate(values, {
      abortEarly: false,
    });

    setLoading(true);

    const url = "/api/settings/change-password";
    const res = await fetchWrapper(url, "PUT", values);
    if (res.status === 200) {
      openNotification("Success", res.data.message, "success");
      router.push("/dashboard");
    }
    return res;
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
      setErrMsg(err.message || "Something went wrong. Please try again.");
    }
    console.error(err);
  } finally {
    setLoading(false);
  }
};
