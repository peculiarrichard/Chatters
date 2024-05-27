import React from "react";
import { GeneralInputProps } from "@/models/props/form-elements/GeneralInput";

export const GeneralInput: React.FC<GeneralInputProps> = ({
  label,
  name,
  placeholder,
  hasButton = false,
  buttonName,
  type,
  hasleftIcon = false,
  leftIcon = null,
  hasIconAsButton = false,
  iconAsButton = null,
  onClick,
  hasDescription = false,
  description,
  value,
  onChange,
  readonly = false,
  min,
}) => {
  return (
    <div className="mb-4 text-gray-900 w-full">
      <label
        className="block font-[700] mb-2 leading-normal text-[#1E5ED4] text-base"
        htmlFor={name}>
        {label}
      </label>
      <div
        className={`bg-transparent flex items-center justify-between border border-[#1E5ED4] rounded-[2rem] w-full py-[0.875rem] px-[0.75rem] text-gray-700`}>
        <div className="flex items-center gap-3 w-full">
          {hasleftIcon && React.createElement(leftIcon, { size: 20 })}
          <input
            className="bg-transparent focus:outline-none appearance-none text-gray-900 w-full"
            id={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            readOnly={readonly}
            min={min}
          />
        </div>
        {hasButton && (
          <button
            type="button"
            onClick={onClick}
            className="text-ss font-bold text-right text-[#1E5ED4]">
            {" "}
            {hasIconAsButton
              ? React.createElement(iconAsButton, { size: 25 })
              : buttonName}{" "}
          </button>
        )}
      </div>
      <p className="text-sb leading-normal">{hasDescription && description}</p>
    </div>
  );
};
