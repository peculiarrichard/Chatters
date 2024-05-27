import { IconType } from "react-icons/lib";

export interface GeneralInputProps {
  label: string;
  name: string;
  placeholder: string;
  hasButton?: boolean;
  buttonName?: string;
  type: string;
  hasleftIcon?: boolean;
  leftIcon?: IconType | any;
  hasIconAsButton?: boolean;
  iconAsButton?: IconType | any;
  onClick?: () => void;
  hasDescription?: boolean;
  description?: string;
  value?: string | number;
  readonly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
}
