import { AccountDetails } from "@/models/props/settings/AccountDetails";
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { openNotification } from "@/components/commons/Toasts";
import { accountSettingsValidationSchema } from "@/validations/settings/accountsettings-validation";
import { handleValidationError } from "@/utils/general/handleValidationErrors";

export const updateProfileService = async (
  values: AccountDetails,
  setLoading: (val: boolean) => void,
  setErrMsg: (val: string) => void,
  setFormErrors: (errors: { [key: string]: string }) => void
) => {
  try {
    await accountSettingsValidationSchema.validate(values, {
      abortEarly: false,
    });

    setLoading(true);
    const url = "/api/settings/update-profile";
    const res = await fetchWrapper(url, "PUT", values);
    if (res.status === 200) {
      const chattersUser = localStorage.getItem("chattersUser");
      let parsedChattersUser = chattersUser ? JSON.parse(chattersUser) : null;
      parsedChattersUser = res.data.updatedProfile;
      localStorage.setItem("chattersUser", JSON.stringify(parsedChattersUser));
      openNotification(
        "Success",
        res.data.message || "Profile updated successfully",
        "success"
      );
    }
    return res;
  } catch (err: any) {
    handleValidationError(err, setFormErrors, setErrMsg);
    console.error(err);
  } finally {
    setLoading(false);
  }
};
