import { Help } from "@/models/props/settings/Help";
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { openNotification } from "@/components/commons/Toasts";

export const helpAndFeedbackService = async (
  values: Help,
  router: AppRouterInstance,
  setLoading: (val: boolean) => void,
  setErrMsg: (val: string) => void
) => {
  if (!values.message || !values.subject) {
    setErrMsg("All fields are required");
    return;
  }

  setLoading(true);

  try {
    const url = "/api/settings/help";
    const res = await fetchWrapper(url, "POST", values);
    if (res.status === 200) {
      openNotification("Success", res.data.message, "success");
      router.push("/dashboard");
    }
    return res;
  } catch (err: any) {
    setErrMsg(err.message || "Something went wrong. Please try again.");
    console.error(err);
  } finally {
    setLoading(false);
  }
};
