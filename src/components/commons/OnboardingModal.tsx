import { GeneralInput } from "../form-elements/GeneralInput";
import { topicsOfInterestList } from "@/data/topicsOfInterestList";
import { OnboardingInterface } from "@/models/props/onboarding/OnborardingInterface";
import { useState } from "react";
import { Checkbox, Modal, Select } from "antd";
import { Button } from "./Buttons";
import { onboardUserService } from "@/services/onboard/onboard-service";

export const OnboardingModal = ({
  handleCancel,
  isModalOpen,
}: {
  handleCancel: () => void;
  isModalOpen: boolean;
}) => {
  const [values, setValues] = useState<OnboardingInterface>({
    userName: "",
    mainActivity: "",
    topicsOfInterest: [],
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleCheckboxChange = (topic: string, checked: boolean) => {
    if (checked) {
      setValues((prevValues) => ({
        ...prevValues,
        topicsOfInterest: [...prevValues.topicsOfInterest, topic],
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        topicsOfInterest: prevValues.topicsOfInterest.filter(
          (t) => t !== topic
        ),
      }));
    }
  };

  const handleSelectChange = (value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      mainActivity: value,
    }));
  };

  const handleOnboardUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onboardUserService(
      values,
      setLoading,
      setErrorMsg,
      setFormErrors,
      handleCancel
    );
  };
  return (
    <>
      <Modal
        title="Just a few more steps and you are in"
        centered={true}
        footer={null}
        width={800}
        open={isModalOpen}
        style={{ top: 20 }}
        onCancel={handleCancel}>
        <form
          className="my-6 flex flex-col gap-y-6"
          onSubmit={handleOnboardUser}>
          <GeneralInput
            type="text"
            label="Choose a username"
            placeholder="Enter username"
            name="userName"
            value={values.userName}
            onChange={(e) => setValues({ ...values, userName: e.target.value })}
          />
          {formErrors.userName && (
            <p className="text-red-500">{formErrors.userName}</p>
          )}
          <div>
            <h2 className="block font-[700] mb-2 leading-normal text-[#1E5ED4] text-base">
              What will you be doing mostly with this app?
            </h2>
            <Select
              defaultValue="Reading"
              style={{ width: "100%" }}
              onChange={handleSelectChange}
              options={[
                { value: "Reading", label: "Reading" },
                { value: "Writing", label: "Writing" },
                { value: "Both", label: "Both" },
              ]}></Select>
            {formErrors.mainActivity && (
              <p className="text-red-500">{formErrors.mainActivity}</p>
            )}
          </div>
          <div className="mt-4">
            <h2 className="block font-[700] mb-2 leading-normal text-[#1E5ED4] text-base">
              Select your topics of interest (select at least 3)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-y-auto">
              {topicsOfInterestList.map((topic) => (
                <Checkbox
                  key={topic}
                  onChange={(e) =>
                    handleCheckboxChange(topic, e.target.checked)
                  }
                  checked={values.topicsOfInterest.includes(topic)}>
                  {topic}
                </Checkbox>
              ))}
            </div>
            {formErrors.topicsOfInterest && (
              <p className="text-red-500">{formErrors.topicsOfInterest}</p>
            )}
          </div>
          <Button
            type="submit"
            buttonText="Submit"
            variant="primary"
            className="mt-6"
            loading={loading}
          />
          {errorMsg && <p className="text-red-500 text-left">{errorMsg}</p>}
        </form>
      </Modal>
    </>
  );
};
