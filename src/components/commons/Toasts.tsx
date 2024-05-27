import { notification } from "antd";

export const openNotification = (
  message: string,
  description: string,
  method: "success" | "info" | "warning" | "error" | "open"
) => {
  notification[method]({
    message: message,
    description: description,
    placement: "bottom",
  });
};
