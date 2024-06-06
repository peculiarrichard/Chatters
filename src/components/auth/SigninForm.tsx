import { SigninInterface } from "@/models/props/auth/SigninModel";
import { GeneralInput } from "../form-elements/GeneralInput";
import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { Button } from "../commons/Buttons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signinService } from "@/services/auth/signin-service";

export const SigninForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<SigninInterface>({
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

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signinService(
      formValues,
      router,
      setErrorMsg,
      setLoading,
      setFormErrors
    );
  };

  return (
    <div className="w-[80%] lg:w-[55%] mt-20 mb-6 flex flex-col gap-y-8 m-auto lg:mx-14 max-w-7xl h-screen">
      <h2 className="text-3xl font-bold">Welcome back Champ!</h2>
      <p className="text-base text-gray-600">Sign in to continue:</p>
      <form onSubmit={handleSignin}>
        <GeneralInput
          label="Email"
          name="email"
          placeholder="john.doe@email.com"
          type="email"
          hasleftIcon={true}
          onChange={(e) =>
            setFormValues({ ...formValues, email: e.target.value })
          }
          value={formValues.email}
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
          leftIcon={RiLockPasswordLine}
          hasButton={true}
          value={formValues.password}
          onChange={(e) =>
            setFormValues({ ...formValues, password: e.target.value })
          }
          hasIconAsButton={true}
          iconAsButton={
            showPassword ? MdOutlineVisibility : MdOutlineVisibilityOff
          }
          onClick={toggleShowPassword}></GeneralInput>
        {formErrors.firstName && (
          <p className="text-red-500">{formErrors.password}</p>
        )}
        <Button
          buttonText="Sign In"
          type="submit"
          variant="primary"
          className="mt-6"
          loading={loading}
        />
        {errorMsg && <p className="text-red-500 text-left">{errorMsg}</p>}
      </form>
      <p className="text-center m-auto mt-6 mb-4">
        You don&apos;t have an account yet?{" "}
        <span className="text-[#1E5ED4] ">
          <Link href="/signup" className="hover:underline">
            Sign Up
          </Link>
        </span>
      </p>
    </div>
  );
};
