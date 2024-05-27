import { CiSearch } from "react-icons/ci";
import { ProfileMenu } from "./ProfileMenu";

export default function TopBar() {
  return (
    <>
      <div className="flex items-start mt-16 lg:mt-0 justify-between m-auto w-full bg-[#F2F7FF] py-4 px-3 rounded-2xl">
        <div className="flex rounded-[2rem] py-3 px-2 lg:px-8 items-center justify-between border bg-[#EFEFEF] w-3/5">
          <input
            type="text"
            placeholder="Search"
            className="focus:outline-none appearance-none text-gray-900 bg-transparent"></input>
          <CiSearch />
        </div>
        <ProfileMenu />
      </div>
    </>
  );
}
