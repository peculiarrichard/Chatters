import { useState } from "react";
import { AccountSettings } from "./AccountSettings";
import { HelpAndFeedBack } from "./Help";
import { SecuritySettings } from "./SecuritySettings";

export const SettingsContainer = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      <div className="flex items-start justify-between lg:w-[70%] mt-10">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            className={` leading-normal text-ss py-2 capitalize ${
              activeTab === index
                ? "border-b border-b-[#1E5ED4] text-[#1E5ED4] font-semibold"
                : "text-[#586179] border-none"
            }`}
            onClick={() => {
              handleTabClick(index);
            }}>
            {index === 0 ? "Account" : index === 1 ? "Security" : "Help Center"}
          </button>
        ))}
      </div>
      {activeTab === 0 && <AccountSettings />}
      {activeTab === 1 && <SecuritySettings />}
      {activeTab === 2 && <HelpAndFeedBack />}
    </>
  );
};
