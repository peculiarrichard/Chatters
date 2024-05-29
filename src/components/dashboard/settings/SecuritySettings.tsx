import { useState } from "react";
import { Input } from "antd";
import { Button } from "@/components/commons/Buttons";
import { changePasswordService } from "@/services/settings/change-password-service";
import { ChangePasswordInterface } from "@/models/props/settings/ChangePassword";
import { useRouter } from "next/navigation";

export const SecuritySettings = () => {
  const [values, setValues] = useState<ChangePasswordInterface>({
    oldPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await changePasswordService(
      values,
      router,
      setLoading,
      setErrMsg,
      setFormErrors
    );
  };

  return (
    <>
      <div className="text-sm my-6">
        <h2 className="font-bold text-xl md:text-2xl text-[#1E5ED4] mb-2">
          Password and Security
        </h2>
        <p className="text-[#586179] mb-6">Update your password</p>
        <form
          className="lg:w-[70%] flex flex-col gap-y-6"
          onSubmit={handleChangePassword}>
          <div>
            <h2 className="font-bold">Old Password</h2>
            <Input
              name="oldPassword"
              value={values.oldPassword}
              onChange={(e) =>
                setValues({ ...values, oldPassword: e.target.value })
              }></Input>
            {formErrors.oldPassword && (
              <p className="text-red-500">{formErrors.oldPassword}</p>
            )}
          </div>
          <div>
            <h2 className="font-bold">New Password</h2>
            <Input
              name="newPassword"
              value={values.newPassword}
              onChange={(e) =>
                setValues({ ...values, newPassword: e.target.value })
              }></Input>
            {formErrors.newPassword && (
              <p className="text-red-500">{formErrors.newPassword}</p>
            )}
          </div>
          <Button
            buttonText="Submit"
            variant="primary"
            loading={loading}></Button>
          {errMsg && <p className="text-red-500 text-left">{errMsg}</p>}
        </form>
      </div>
    </>
  );
};
