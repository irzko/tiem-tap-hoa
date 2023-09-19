import { LabelHTMLAttributes } from "react";

interface LabelFieldProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
  labelColor?: string;
}

export default function LabelField({
  children,
  htmlFor,
  labelColor,
}: LabelFieldProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`absolute text-sm duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 ${labelColor}`}
    >
      {children}
    </label>
  );
}
