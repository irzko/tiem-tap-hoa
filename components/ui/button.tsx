import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: React.ReactNode;
  color?: "primary" | "secondary" | "success" | "danger" | "warning";
}

export default function Button({
  children,
  className,
  color = "primary",
  disabled,
  ...props
}: ButtonProps) {
  let buttonColor = "";
  let disabledButtonColor = "";
  switch (color) {
    case "primary": {
      buttonColor =
        "text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 focus:ring-blue-300";
      disabledButtonColor = "text-white bg-blue-400 dark:bg-blue-500";
      break;
    }
    // case "secondary": {
    //   buttonColor = "text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700";
    //   disabledButtonColor = "text-gray-900 bg-white border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600";
    //   break;
    // }
    case "danger": {
      buttonColor =
        "text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900";
      disabledButtonColor = "text-white bg-red-400 dark:bg-red-500";
      break;
    }
  }
  return (
    <button
      {...props}
      className={`font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center ${
        disabled
          ? `cursor-not-allowed ${disabledButtonColor}`
          : `focus:ring-4 focus:outline-none ${buttonColor}`
      } ${className}}`}
    >
      {children}
    </button>
  );
}
