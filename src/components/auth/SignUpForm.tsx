import { SignUpInterface } from "@/models/props/auth/SignUpModel";
import { GeneralInput } from "../form-elements/GeneralInput";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import Image from "next/image";
import { Button } from "../commons/Buttons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUpService } from "@/services/auth/signup-service";

export const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<SignUpInterface>({
    fullName: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const router = useRouter();
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signUpService(
      formValues,
      setLoading,
      setErrorMsg,
      router,
      setFormErrors
    );
  };

  return (
    <div className="w-[90%] m-auto mt-20 flex justify-between h-screen gap-16 max-w-7xl">
      <div className="md:w-3/4 lg:w-1/2">
        <h2 className="text-3xl font-bold my-2">Sign up on Chatters</h2>
        <p className="text-base mb-8 text-gray-600">
          A place to write, read, share, and fing your own tribe.
        </p>
        <form onSubmit={handleSignup}>
          <GeneralInput
            label="Full Name"
            name="fullName"
            placeholder="John Doe"
            type="text"
            value={formValues.fullName}
            onChange={(e) => setFormValues({ ...formValues, fullName: e.target.value })}
            hasleftIcon={true}
            leftIcon={FaRegUser}></GeneralInput>
          {formErrors.fullName && (
            <p className="text-red-500">{formErrors.fullName}</p>
          )}
          <GeneralInput
            label="Email"
            name="email"
            placeholder="john.doe@email.com"
            type="email"
            value={formValues.email}
            onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
            hasleftIcon={true}
            leftIcon={HiOutlineMail}></GeneralInput>
          {formErrors.email && (
            <p className="text-red-500">{formErrors.email}</p>
          )}
          <GeneralInput
            label="Password"
            name="password"
            placeholder="********"
            type={showPassword ? "text" : "password"}
            hasleftIcon={true}
            value={formValues.password}
            onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
            leftIcon={RiLockPasswordLine}
            hasButton={true}
            hasIconAsButton={true}
            iconAsButton={
              showPassword ? MdOutlineVisibility : MdOutlineVisibilityOff
            }
            onClick={toggleShowPassword}></GeneralInput>
          {formErrors.password && (
            <p className="text-red-500">{formErrors.password}</p>
          )}
          <Button
            buttonText="Sign Up"
            type="submit"
            variant="primary"
            className="mt-6"
            loading={loading}
          />
          {errorMsg && <p className="text-red-500 text-left">{errorMsg}</p>}
        </form>
        <p className="text-center m-auto mt-6 mb-4">
          Already have an account?{" "}
          <span className="text-[#1E5ED4] ">
            <Link href="/" className="hover:underline">
              Sign In
            </Link>
          </span>
        </p>
      </div>
      <Image
        src="/assets/signup-img.png"
        alt="signup"
        width={500}
        height={500}
        className="w-1/2 self-end justify-self-end hidden lg:flex"
      />
    </div>
  );
};
