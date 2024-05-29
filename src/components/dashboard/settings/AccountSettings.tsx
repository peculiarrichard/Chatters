import { useUser } from "@/context/UserContext";
import { Input, Checkbox } from "antd";
import { topicsOfInterestList } from "@/data/topicsOfInterestList";
import { useState, useEffect } from "react";
import { Button } from "@/components/commons/Buttons";
import { AccountDetails } from "@/models/props/settings/AccountDetails";
import { updateProfileService } from "@/services/settings/update-profile-service";

const { TextArea } = Input;

export const AccountSettings = () => {
  const user = useUser();
  const [values, setValues] = useState<AccountDetails>({
    userName: "",
    website: "",
    bio: "",
    topicsOfInterest: [],
  });
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (user) {
      setValues((prev: AccountDetails) => ({
        ...prev,
        userName: user.userName,
        website: user.website,
        bio: user.bio,
        topicsOfInterest: user.topicsOfInterest,
      }));
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (topic: string, checked: boolean) => {
    if (checked) {
      setValues((prev) => ({
        ...prev,
        topicsOfInterest: [...prev.topicsOfInterest, topic],
      }));
    } else {
      setValues((prev) => ({
        ...prev,
        topicsOfInterest: prev.topicsOfInterest.filter((t) => t !== topic),
      }));
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateProfileService(values, setLoading, setErrMsg, setFormErrors);
  };

  return (
    <>
      <h2 className="font-bold text-xl md:text-2xl text-[#1E5ED4] my-6">
        Account Settings
      </h2>
      <form
        className="flex flex-col gap-6 text-sm my-10 lg:w-[70%]"
        onSubmit={handleProfileUpdate}>
        <div className="">
          <h2 className="font-[700]">Name</h2>
          <Input
            value={user?.fullName}
            readOnly
            disabled
            className="text-black"></Input>
        </div>
        <div className="">
          <h2 className="font-[700]">Email</h2>
          <Input
            value={user?.email}
            readOnly
            disabled
            className="text-black"></Input>
        </div>
        <div className="">
          <h2 className="font-[700]">Username</h2>
          <Input
            value={values.userName}
            onChange={handleInputChange}
            name="userName"></Input>
        </div>
        <div className="">
          <h2 className="font-[700]">Website</h2>
          <Input
            name="website"
            value={values.website}
            onChange={handleInputChange}
            placeholder="Enter website"></Input>
          {formErrors.website && (
            <p className="text-red-500">{formErrors.website}</p>
          )}
        </div>
        <div>
          <h2 className="font-[700]">Bio</h2>
          <TextArea
            rows={6}
            placeholder="Enter bio"
            value={values.bio}
            onChange={handleInputChange}
            name="bio"
          />
          {formErrors.bio && <p className="text-red-500">{formErrors.bio}</p>}
        </div>
        <div>
          <h2 className="mb-4">Your topics of interest</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-y-auto">
            {topicsOfInterestList.map((topic) => (
              <Checkbox
                key={topic}
                onChange={(e) => handleCheckboxChange(topic, e.target.checked)}
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
          variant="primary"
          buttonText="Update Profile"
          className="mt-6"
          loading={loading}
        />
      </form>
      {errMsg && <p className="text-red-500 text-left">{errMsg}</p>}
    </>
  );
};
