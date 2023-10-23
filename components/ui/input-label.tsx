import { LabelHTMLAttributes } from "react";

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
  labelColor?: string;
}

export default function InputLabel({
  children,
  labelColor,
  ...props
}: InputLabelProps) {
  return (
    <label
      {...props}
      className={`pointer-events-none absolute text-sm duration-300 transform -translate-y-3 scale-75 top-3 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 ${labelColor}`}
    >
      {children}
    </label>
  );
}
