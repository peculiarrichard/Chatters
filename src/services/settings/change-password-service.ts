import { ChangePasswordInterface } from "@/models/props/settings/ChangePassword";
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { openNotification } from "@/components/commons/Toasts";
import { changePasswordValidation } from "@/validations/settings/changePasswordValidation";
import { handleValidationError } from "@/utils/general/handleValidationErrors";

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
    handleValidationError(err, setFormErrors, setErrMsg);
    console.error(err);
  } finally {
    setLoading(false);
  }
};
