import { Spin } from "antd";
export const PrimaryButton = ({
  onClick,
  buttonText,
  isLoading,
  type,
  ref,
  ...rest
}: {
  onClick?: () => void;
  buttonText?: string;
  isLoading?: boolean;
  type?: "submit" | "reset" | "button";
  ref?: any;
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      ref={ref}
      {...rest}
      className={`w-full p-4 rounded-lg border leading-normal text-white font-semibold bg-[#1E5ED4] border-[#1E5ED4] text-sm`}>
      {isLoading ? <Spin /> : buttonText}
    </button>
  );
};

export const Button = ({
  children,
  className,
  variant,
  type,
  disabled,
  loading,
  buttonText,
  ...rest
}: {
  children?: string;
  className?: string;
  variant?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  buttonText: string;
}) => {
  let variantProperties;
  className = disabled
    ? "cursor-not-allowed bg-grey-300 text-white rounded-lg font-[700] p-4 w-full leading-[1.5rem] border-none"
    : className;

  switch (variant) {
    case "primary":
      variantProperties =
        "bg-[#1E5ED4] text-white rounded-lg font-[700] p-4 w-full leading-[1.5rem]";
      break;

    case "outlined":
      variantProperties =
        "border-[#1E5ED4] bg-transparent text-[#1E5ED4] border-2 rounded-lg font-[700] p-4 w-full leading-[1.5rem]";
      break;

    case "tabActive":
      variantProperties =
        "bg-[#1E5ED4] text-white rounded-[1.5rem] font-[700] p-4 w-full leading-[1.5rem]";
      break;

    case "tabInActive":
      variantProperties =
        "bg-grey-500 text-black rounded-[1.5rem] font-[700] p-4 w-full leading-[1.5rem]";
      break;

    default:
      variantProperties = "";
      break;
  }

  return (
    <>
      <button
        className={className + " " + variantProperties}
        type={type}
        {...rest}>
        {loading ? <Spin /> : buttonText}
        {children}
      </button>
    </>
  );
};
