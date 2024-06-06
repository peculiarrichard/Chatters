import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { OnboardingInterface } from "@/models/props/onboarding/OnborardingInterface";
import { onboardValidationSchema } from "@/validations/onboarding/onboard-validation";
import * as Yup from "yup";
import { openNotification } from "@/components/commons/Toasts";
import { handleValidationError } from "@/utils/general/handleValidationErrors";

export const onboardUserService = async (
  values: OnboardingInterface,
  setLoading: (value: boolean) => void,
  setErrorMsg: (msg: string) => void,
  setFormErrors: (errors: { [key: string]: string }) => void,
  handleCancel: () => void
) => {
  try {
    await onboardValidationSchema.validate(values, {
      abortEarly: false,
    });

    setLoading(true);
    const url = "/api/onboard";
    const res = await fetchWrapper(url, "PUT", values);
    if (res.status === 200) {
      const chattersUser = localStorage.getItem("chattersUser");
      let parsedChattersUser = chattersUser ? JSON.parse(chattersUser) : null;
      parsedChattersUser = res.data.updatedUser;
      localStorage.setItem("chattersUser", JSON.stringify(parsedChattersUser));
      openNotification(
        "Success",
        res.data.message || "Onboarding Successful",
        "success"
      );
      handleCancel();
    }
    return res;
  } catch (err: any) {
    handleValidationError(err, setFormErrors, setErrorMsg);
    console.error(err);
  } finally {
    setLoading(false);
  }
};
