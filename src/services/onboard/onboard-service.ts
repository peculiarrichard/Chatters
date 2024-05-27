import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { OnboardingInterface } from "@/models/onboarding/OnborardingInterface";
import { onboardValidationSchema } from "@/validations/onboarding/onboard-validation";
import * as Yup from "yup";
import { openNotification } from "@/components/commons/Toasts";

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
    } else {
      setErrorMsg(
        res.data.message || "Something went wrong. Please try again."
      );
    }
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
