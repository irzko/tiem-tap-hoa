import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: React.ReactNode;
}

export default function IconButton({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="relative text-gray-900 w-8 h-8 flex justify-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-full text-sm text-center items-center dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:text-white"
    >
      {children}
    </button>
  );
}
